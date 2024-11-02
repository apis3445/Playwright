import { test } from '@playwright/test';
import { DashboardPage } from '../../pages/Effiziente/dashboardPage';
import { AccountReceivableApi } from '../../api/Effiziente/AccountsReceivable.api';
import * as allure from 'allure-js-commons';

test.describe('Check Dashboard', () => {
    test.use({ storageState: 'auth/user.json' });
    // eslint-disable-next-line playwright/expect-expect
    test('Should show dashboard', {
        tag: ['@VisualTesting'],
    }, async ({ page }) => {
        await allure.feature('Visual Testing');
        await allure.suite('Effiziente');
        const dashboardPage = new DashboardPage(page);
        const accountReceivableApi = new AccountReceivableApi(page);
        //Replace api with fixed data because the dashboard changes every day
        //The api can be tested with postman to ensure that the info is correct
        await accountReceivableApi.mockAllApis();
        await dashboardPage.goTo();
        await dashboardPage.waitForChartsAreVisible();
        await dashboardPage.checkSnapshot();
    });
});