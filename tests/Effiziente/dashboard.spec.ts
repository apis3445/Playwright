import { test } from '@playwright/test';
import { DashboardPage } from '../../pages/Effiziente/dashboardPage';
import { AccountReceivableApi } from '../../api/Effiziente/AccountsReceivable.api';

test.describe('Check Dashboard', async () => {
    test.use({ storageState: 'auth/user.json' });
    // eslint-disable-next-line playwright/expect-expect
    test('Should show dashboard', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const accountReceivableApi = new AccountReceivableApi(page);
        await accountReceivableApi.mockAllApis();
        await dashboardPage.goTo();
        await dashboardPage.waitForCharts();
        await dashboardPage.checkSnapshot();
    });
});