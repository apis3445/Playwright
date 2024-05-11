import ExcelJS from 'exceljs';

export class ExcelHelper {

    private headers: string[] = [];

    /**
     * Reads excel file and returns a list of record<string, string>
     * @param fileName Excel file name
     * @param worksheetName Name of the worksheet to get the data
     * @returns 
     */
    async readExcel(fileName: string, worksheetName='data') : Promise<Record<string, string>[]> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(fileName);
        const rows: Record<string, string>[] = [];
        const sheet = workbook.getWorksheet(worksheetName)!;
        for (let index = 1; index <= sheet.columnCount; index++) {
            this.headers.push(sheet.getRow(1).getCell(index).text);
        }
        for (let i = 2; i <= sheet.rowCount; i++) {
            const rowValues: Record<string, string> = {};
            for (let j = 0; j < this.headers.length; j++) {
                rowValues[this.headers[j]] = sheet.getRow(i).getCell(j+1).text;
            }
            rows.push(rowValues);
        }
        return rows;
    }
}