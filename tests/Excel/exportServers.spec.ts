 
import { expect, test } from '@playwright/test';
import { ServersPage } from '../../pages/Effiziente/serversPage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

test.describe('Servers', () => {
    test.use({ storageState: 'auth/admin.json' });

    test('Should export servers to excel', {
        tag: ['@Excel'],
    }, async ({ page }, testInfo) => {
        const serversPage = new ServersPage(page, testInfo);
        await serversPage.goTo();
        await serversPage.exportToExcel.click('servers.xlsx');
        const excelRows = await serversPage.exportToExcel.getExcelRows();
        const gridRows = await serversPage.table.getRowsValues();
        const assertDescription = 'The excel file rows are equal to the grid rows';
        serversPage.addAnnotation(AnnotationType.Assert, assertDescription);
        await expect(excelRows).toStrictEqual(gridRows);
    });
});