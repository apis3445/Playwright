import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Table extends BaseComponent {

    columnsText: string[];

    constructor(page: Page, annotationHelper: AnnotationHelper) {
        super(page, annotationHelper);
        this.columnsText = [];
    }

    /**
     * Click in edit by key 
     * @param keyValue 
     */
    async clickInEditByKey(keyValue: number) {
        await this.addStep('Click in the edit table for the row with the key: "' + keyValue + '"', async () => {
            const row = this.page.getByRole('row', { name: keyValue.toString() });
            await row?.locator('[aria-label="Edit"]').click();
        });
    }

    /**
     * Get columns headers
     * @returns columns headers
     */
    async getColumnsHeaders(): Promise<string[]> {
        return await this.addStep('Get the columns headers of the table', async () => {
            this.columnsText = await this.page.locator('th').allInnerTexts();
            for (let i = 0; i < this.columnsText.length; i++) {
                const columnHeader = this.columnsText[i];
                if (columnHeader.trim() != '') {
                    // Webkit adds '\n' so we need to remove 
                    this.columnsText[i] = this.columnsText![i].replace(/\n/g, '');
                }
            }
            return this.columnsText;
        });
    }

    /**
     * Get the index of the column header
     * @param columnHeader Column header to get the index
     * @returns The column index
     */
    async getColumnIndex(columnHeader: string): Promise<number> {
        await this.getColumnsHeaders();
        const idIndex = this.columnsText.indexOf(columnHeader);
        return idIndex;
    }

    /**
     * Get row with the value in the column index
     * @param value Value for the column index
     * @param index Column index to find the value
     * @returns the row for the column index
     */
    async getRowByColumnIndex(value: string, index: number) {
        return await this.addStep('Get the row with the value: "' + value + ' in the column: "' + index + '"', async () => {
            const totalRows = await this.getTotalRows();
            for (let i = 0; i < totalRows; i++) {
                const row = this.page.locator('tbody > tr').nth(i);
                const columnValue = await row.locator('td').nth(index).innerText();
                if (columnValue == value)
                    return row;
            }
            return null;
        });
    }

    /**
     * Get total of rows
     * @returns get total of rows
     */
    async getTotalRows() {
        return await this.addStep('Get total of rows in the table', async () => {
            return await this.page.getByRole('row').count();
        });
    }

    /**
     * Get row by key
     * @param key key to find
     * @param keyColumnTitle Key column header title
     * @returns the row for the key
     */
    async getRowByKey(key: number, keyColumnTitle = 'Key') {
        return await this.addStep('Get the row with the "' + key + '" in the column: "' + keyColumnTitle + '"', async () => {
            const index = await this.getColumnIndex(keyColumnTitle);
            console.log('index:' + index);
            const row = await this.getRowByColumnIndex(key.toString(), index);
            return row;
        });
    }

    /**
     * Get row values in a object from a row
     * @param row Row to get value
     * @returns row values as object
     */
    async getRowValues(row: Locator | null) {
        return await this.addStep('Get the row values', async () => {
            const rowValues: Record<string, string> = {};
            const columnValues = await row?.locator('td').allInnerTexts();
            const totalColumns = await columnValues?.length ?? 0;
            for (let i = 0; i < totalColumns; i++) {
                const columnHeader = this.columnsText[i];
                if (columnHeader.trim() != '') {
                    let columnValue =  columnValues![i].trim();
                    if (columnValue == 'Yes')
                        columnValue = 'true';
                    if (columnValue == 'Yes')
                        columnValue = 'false';
                    rowValues[columnHeader] = columnValue;
                }
                
            }
            return rowValues;
        });
    }

    /**
     * Get the rows of the table as an array of record <string, string>
     * @returns The rows in the table as an array of record with the header as properties and the row data as the value
     */
    async getRowsValues() :  Promise<Record<string, string>[]> {
        return await this.addStep('Get all the rows in the table', async () => {
            const rows: Record<string, string>[] = [];
            const totalRows = await this.getTotalRows();
            await this.getColumnsHeaders();
            //Starts in 1 to exclude header
            for (let i = 1; i < totalRows; i++) {
                let rowValues: Record<string, string> = {};
                const row =  this.page.locator('tr').nth(i);
                rowValues = await this.getRowValues(row);
                rows.push(rowValues);
            }
            return rows;
        });
    }

    /**
     * Get rows values as an object finding the row with the key column
     * @param key Key to find the row
     * @param keyColumnTitle Key column header title
     * @returns 
     */
    async getRowValuesByKey(key: number, keyColumnTitle = 'Key') {
        return await this.addStep('Get the row values for the key: "' + key + '" in the column: "' + keyColumnTitle + '" ', async () => {
            const row = await this.getRowByKey(key, keyColumnTitle);
            const rowValues = this.getRowValues(row);
            return rowValues;
        });
    }
}