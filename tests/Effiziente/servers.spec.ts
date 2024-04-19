import { expect, test } from '@playwright/test';
import { ServersPage } from '../../pages/Effiziente/serversPage';
import { AddServerPage } from '../../pages/Effiziente/addServerPage';
import { faker } from '@faker-js/faker';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

test.describe('Servers', () => {
    let id = 0;
    test.use({ storageState: 'auth/admin.json' });

    test('Should add a server', async ({ page }) => {
        const serversPage = new ServersPage(page);
        await serversPage.goTo();
        const key = faker.number.int({ min: 2, max: 100 });
        const name = faker.company.name();
        const url = faker.internet.url();
        await serversPage.add.click();
        const addServerPage = new AddServerPage(page);
        await addServerPage.key.fill(key.toString());
        await addServerPage.name.fill(name);
        await addServerPage.url.fill(url);
        id = await addServerPage.saveClick();
        let assertDescription = 'Server id should be a number greater than 1';
        addServerPage.addAnnotation(AnnotationType.Assert, assertDescription);
        expect(id, assertDescription).toBeGreaterThan(1);
        const totalRows = await serversPage.table.getTotalRows();
        assertDescription = 'The total rows for server is greater than 1';
        expect(totalRows, assertDescription).toBeGreaterThan(1);
        const row = await serversPage.table.getRowBykey(key);
        assertDescription = `Row with the key: ${key} exists`;
        addServerPage.addAnnotation(AnnotationType.Assert, assertDescription);
        expect(row, assertDescription).not.toBeNull();
        const rowValues = await serversPage.table.getRowValues(row);
        assertDescription = `The server name for the key: "${key}" is: "${name}"`;
        expect(rowValues.Name, assertDescription).toBe(name);
        assertDescription = `The server urls for the key: "${key}" is: "${url}"`;
        expect(rowValues.Url, assertDescription).toBe(url);
    });

    test.afterEach(async ({ page }) => {
        //Remove the server after each test 
        const addServerPage = new AddServerPage(page);
        if (id > 0)
            await addServerPage.serverApi.deleteServerByApi(id);
    });
});