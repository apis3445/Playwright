import { test } from '@playwright/test';
import { ServersPage } from '../../pages/Effiziente/serversPage';
import { faker } from '@faker-js/faker';

test.describe('Servers', () => {
    test.use({ storageState: 'auth/admin.json' });
    // eslint-disable-next-line playwright/expect-expect
    test('Should add a server', async ({ page }) => {
        const serversPage = new ServersPage(page);
        await serversPage.goTo();

        const key = faker.number.int({ min: 2, max: 100 });
        const name = faker.company.name();
        const url = faker.internet.url();
        await serversPage.add.click();
    });
});