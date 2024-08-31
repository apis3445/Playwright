import { test } from '@playwright/test';
import { DashboardPage } from '../../pages/Effiziente/dashboardPage';
import { AccountReceivableApi } from '../../api/Effiziente/AccountsReceivable.api';

test.describe('Check Dashboard', () => {
    test.use({ storageState: 'auth/user.json' });
    // eslint-disable-next-line playwright/expect-expect
    test('Should show dashboard', {
        tag: ['@VisualTesting'],
    }, async ({ page }) => {
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