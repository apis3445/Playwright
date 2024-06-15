/* eslint-disable playwright/expect-expect */
import { test } from '@playwright/test';
import { DashboardPage } from '../../pages/Effiziente/dashboardPage';

test.describe('Normal user', () => {
    test.use({ storageState: 'auth/user.json' });
    test('Should returns user menu', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goTo();
        const menuInPage = await dashboardPage.menu.getTopMenus();
        const menus = ['AccountsReceivable', 'Config'];
        dashboardPage.AssertArrayEqual(menuInPage, menus, 'Menu are equal to: "' + menus.toString() + '"');
    });
});

test.describe('Admin user', () => {
    test.use({ storageState: 'auth/admin.json' });
    test('Should returns admin menu', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goTo();
        const menuInPage = await dashboardPage.menu.getTopMenus();
        const menus = ['AccountsReceivable', 'Security', 'Config'];
        dashboardPage.AssertArrayEqual(menuInPage, menus, 'Menu are equal to: "' + menus.toString() + '"' );
    });
});

