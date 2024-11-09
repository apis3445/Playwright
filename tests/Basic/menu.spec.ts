/* eslint-disable playwright/expect-expect */
import { test } from '@playwright/test';
import { DashboardPage } from '../../pages/Effiziente/dashboardPage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import * as allure from 'allure-js-commons';

test.describe('Normal user', () => {
    test.use({ storageState: 'auth/user.json' });
    test('Should returns user menu', {
        tag: ['@Basic'],
        annotation: [
            { type: AnnotationType.Description, description: 'Login to effiziente demo with a normal user, the user will see the menu for normal users' },
            { type: AnnotationType.Precondition, description: 'A valid normal user' },
        ],
    }, async ({ page }) => {
        await allure.feature('Essential features');
        await allure.suite('Effiziente');
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goTo();
        const menuInPage = await dashboardPage.menu.getTopMenus();
        const menus = ['AccountsReceivable', 'Config'];
        await dashboardPage.AssertArrayEqual(menuInPage, menus, `Menu are equal to: "${menus.toString()}"`);
    });
});

test.describe('Admin user', () => {
    test.use({ storageState: 'auth/admin.json' });

    test('Should returns admin menu', {
        tag: ['@Basic'],
        annotation: [
            { type: AnnotationType.Description, description: 'Login to effiziente demo with a admin user, the user will see the menu for admin users' },
            { type: AnnotationType.Precondition, description: 'A valid admin user' },
        ],
    }, async ({ page }) => {
        await allure.feature('Basic');
        await allure.suite('Effiziente');
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goTo();
        const menuInPage = await dashboardPage.menu.getTopMenus();
        const menus = ['AccountsReceivable', 'Security', 'Config'];
        await dashboardPage.AssertArrayEqual(menuInPage, menus, 'Menu are equal to: "' + menus.toString() + '"');
    });
});

