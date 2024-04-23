import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Server } from '../../../api/models/Effiziente/Server';
import { AddServerPage } from '../../../pages/Effiziente/addServerPage';
import { ServersPage } from '../../../pages/Effiziente/serversPage';
import { AnnotationType } from '../../../utils/annotations/AnnotationType';

test.describe('Servers', () => {
    let id = 0;
    test.use({ storageState: 'auth/admin.json' });

    test('Should add a server', async ({ page }) => {
        const serversPage = new ServersPage(page);
        const addServerPage = new AddServerPage(page);
        await serversPage.goTo();
        //Add server with a random data with faker
        const key = 2;
        const name = faker.company.name();
        const url = faker.internet.url();
        //Delete a server with key 2 if exists to isolate the test
        await serversPage.deleteServerByKey(key.toString());
        await serversPage.add.click();
        await addServerPage.key.fill(key.toString());
        await addServerPage.name.fill(name);
        await addServerPage.url.fill(url);
        //Click and save and wait for the id returned by the api to delete this server
        id = await addServerPage.saveClick();
        let assertDescription = 'Server id should be a number greater than 1';
        addServerPage.addAnnotation(AnnotationType.Assert, assertDescription);
        expect(id, assertDescription).toBeGreaterThan(1);
        const totalRows = await serversPage.table.getTotalRows();
        assertDescription = 'The total rows for server is greater than 1';
        expect(totalRows, assertDescription).toBeGreaterThan(1);
        await serversPage.checkRow(key, name, url);
    });


    test('Should edit a server', async ({ page }) => {
        const serversPage = new ServersPage(page);
        const key = 3;
        const newKey = 4;
        await serversPage.goTo();
        //Check if exists a server with key 3 if not exists create one with API
        const response = await serversPage.serverApi.getServerByKey(key.toString());
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (response.status() == 204) {
            //Create and server by api to test edit to remove dependenciees for the create with UI
            const server: Server = {
                Clave: key,
                Nombre: faker.company.name(),
                Url: faker.internet.url(),
                Activo: true
            };
            id = await serversPage.createServer(server);
        }
        else {
            //Get the id for the server key with id 3 to delete and isolate the test
            const responseText = JSON.parse(await response.text());
            id = +responseText.Id;
        }
        const newName = faker.company.name();
        const newUrl = faker.internet.url();
        //Go to page again to get the server by api
        await serversPage.goTo();
        await serversPage.table.clickInEditByKey(key);
        await serversPage.key.fill(newKey.toString());
        await serversPage.name.fill(newName);
        await serversPage.url.fill(newUrl);
        await serversPage.save.click();
        const assertDescription = 'Success message is visible';
        await serversPage.addAnnotation(AnnotationType.Assert, assertDescription);
        await expect(serversPage.message.locator, assertDescription).toBeVisible();
        await serversPage.checkRow(newKey, newName, newUrl);
    });

    test.afterEach(async ({ page }) => {
        //Remove the server after each test 
        const addServerPage = new AddServerPage(page);
        if (id > 0)
            await addServerPage.serverApi.deleteServer(id);
    });
});