import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Server } from '../../api/Effiziente/Server';
import { ServersPage } from '../../pages/Effiziente/serversPage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import { AddServerPage } from '../../pages/Effiziente/addServerPage';
import * as allure from 'allure-js-commons';

test.describe('Servers', () => {
    let id = 0;
    test.use({ storageState: 'auth/admin.json' });

    test('Should add a server', {
        tag: ['@API'],
        annotation: [
            { type: AnnotationType.Description, description: 'An admin user can add a server' },
            { type: AnnotationType.Precondition, description: 'A valid admin username and password is logged' },
        ],
    }, async ({ page }, testInfo) => {
        await allure.feature('API');
        await allure.suite('Effiziente Servers');
        const serversPage = new ServersPage(page, testInfo);
        const addServerPage = new AddServerPage(page);
        await serversPage.goTo();
        //Add server with a random data from faker
        const key = faker.number.int({ min: 2, max: 999_999 });
        const name = faker.company.name();
        const url = faker.internet.url();
        //Delete a server with key if exists to isolate the test and can be executed in parallel
        await serversPage.deleteServerByKey(key.toString());
        await serversPage.add.click();
        await addServerPage.key.fill(key.toString());
        await addServerPage.name.fill(name);
        await addServerPage.url.fill(url);
        //Click and save and wait for the id returned by the api to delete this server
        id = await addServerPage.saveClick();
        await serversPage.checkSuccessMessage();
        let assertDescription = 'Server id should be a number greater than 1';
        addServerPage.addAnnotation(AnnotationType.Assert, assertDescription);
        expect(id, assertDescription).toBeGreaterThan(1);
        const totalRows = await serversPage.table.getTotalRows();
        assertDescription = 'The total rows for server is greater than 1';
        expect(totalRows, assertDescription).toBeGreaterThan(1);
        await serversPage.checkRow(key, name, url);
    });

    // eslint-disable-next-line playwright/expect-expect
    test('Should edit a server', {
        tag: ['@API'],
        annotation: [
            { type: AnnotationType.Description, description: 'An admin user can edit a server' },
            { type: AnnotationType.Precondition, description: 'A valid admin username and password is logged' },
        ],
    }, async ({ page }, testInfo) => {
        await allure.feature('API');
        await allure.suite('Effiziente Servers');
        const serversPage = new ServersPage(page, testInfo);
        const key = faker.number.int({ min: 2, max: 999_998 });
        const newKey = key + 1;
        await serversPage.goTo();
        //Check if exists a server with key if not exists create one with API
        const response = await serversPage.serverApi.getServerByKey(key.toString());
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (response.status() == 204) {
            //Create and server by api to test edit to remove dependencies for the create with UI
            const server: Server = {
                Key: key,
                Name: faker.company.name(),
                Url: faker.internet.url(),
                Active: true
            };
            id = await serversPage.createServer(server);
        }
        else {
            //Get the id for the server to delete it
            const responseText = await response.text();
            const responseObject = JSON.parse(responseText);
            id = +responseObject.Id;
        }
        const newName = faker.company.name();
        const newUrl = faker.internet.url();
        //Go to page again to get the server created by api
        await serversPage.goTo();
        await serversPage.table.clickInEditByKey(key);
        await serversPage.key.fill(newKey.toString());
        await serversPage.name.fill(newName);
        await serversPage.url.fill(newUrl);
        await serversPage.save.click();
        await serversPage.checkSuccessMessage();
        await serversPage.checkRow(newKey, newName, newUrl);
    });

    test.afterEach(async ({ page }) => {
        //Delete the server created after each test 
        const addServerPage = new AddServerPage(page);
        if (id > 0) {
            addServerPage.addAnnotation(AnnotationType.PostCondition, 'Delete the server with API request');
            await addServerPage.serverApi.deleteServer(id);
        }
    });
});