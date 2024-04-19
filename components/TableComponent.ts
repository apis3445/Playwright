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
    async clickInEditById(keyValue: number, keyColumnTitle = 'Key') {
        const idIndex = await this.getColumnIndex(keyColumnTitle);
        const row = await this.getRowByColumnIndex(keyValue.toString(), idIndex);
        await row?.locator('[aria-label="Edit"]').click();
    }

    /**
     * Get columns headers
     * @returns columns headers
     */
    async getColumnsHeaders(): Promise<string[]> {
        this.columnsText = await this.page.locator('th').allInnerTexts();
        return this.columnsText;
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
        const totalRows = await this.getTotalRows();
        for (let i = 0; i < totalRows; i++) {
            const row = this.page.locator('tbody > tr').nth(i);
            const columnValue = await row.locator('td').nth(index).innerText();
            if (columnValue == value)
                return row;
        }
        return null;
    }

    /**
     * Get total of rows
     * @returns get total of rows
     */
    async getTotalRows() {
        return await this.page.getByRole('row').count();
    }

    /**
     * Get row by key
     * @param key key to find
     * @param keyColumnTitle Key column header title
     * @returns the row for the key
     */
    async getRowBykey(key: number, keyColumnTitle = 'Key') {
        const index = await this.getColumnIndex(keyColumnTitle);
        const row = await this.getRowByColumnIndex(key.toString(), index);
        return row;
    }

    /**
     * Get row values in a object from a row
     * @param row Row to get value
     * @returns row values as object
     */
    async getRowValues(row: Locator | null) {
        const rowValues: Record<string, string> = {};
        const columnValues = await row?.locator('td').allInnerTexts();
        const totalColumns = await columnValues?.length ?? 0;
        for (let i = 0; i < totalColumns; i++) {
            const columnHeader = this.columnsText[i];
            if (columnHeader.trim() != '')
                rowValues[columnHeader] = columnValues![i];
        }
        return rowValues;
    }

    /**
     * Get rows values as an object finding the row with the key column
     * @param key Key to find the row
     * @param keyColumnTitle Key column header title
     * @returns 
     */
    async getRowValuesByKey(key: number, keyColumnTitle = 'Key') {
        const row = await this.getRowBykey(key, keyColumnTitle);
        const rowValues = this.getRowValues(row);
        return rowValues;
    }
}