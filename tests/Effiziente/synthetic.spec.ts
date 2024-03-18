import { expect, test } from '@playwright/test';

test.describe('Synthetic testing', () => {
    const baseURL = process.env.EFFIZIENTE_URL ? process.env.EFFIZIENTE_URL : 'https://effizientedemo.azurewebsites.net';
    const baseAPIURL = process.env.EFFIZIENTE_API_URL ? process.env.EFFIZIENTE_API_URL : 'https://effizienteauthdemo.azurewebsites.net';
    let token = '';

    test.beforeEach(async ({ request }) => {
        const userLogin = {
            Company: process.env.EFFIZIENTE_COMPANY ?? '',
            UserName: process.env.EFFIZIENTE_ADMIN_USER ?? '',
            Password: process.env.EFFIZIENTE_ADMIN_PASSWORD ?? '',
            KeepSession: true,
            Code: 0
        };
        const loginAPi = baseAPIURL + '/api/Usuarios/Login';
        const response = await request.post(loginAPi, { data: userLogin });
        const responseBody = await response.json();
        token = responseBody.Token;
    });

    // eslint-disable-next-line playwright/expect-expect
    test('Should show dashboard', async ({ page }) => {
        const dashboardPageUrl = baseURL + '/AccountsReceivable/dashboard';
        await page.goto(baseURL);
        await page.evaluate(token => {
            localStorage.setItem('token', token);
        }, token);
        await page.goto(dashboardPageUrl);
        await expect(page.locator('#top5 canvas')).toBeVisible();
        await expect(page.locator('#top5Debt canvas')).toBeVisible();
        await expect(page.locator('#top5DaysDelay canvas')).toBeVisible();
        await expect(page.locator('#summaryExpiration')).toBeVisible();
        const topMenuLocator = 'app-menu > p-menubar > .p-menubar > p-menubarsub > ul > li > .p-menuitem-content > a > .p-menuitem-text';
        const menusInPage = await page.locator(topMenuLocator).allInnerTexts();
        const menus = ['AccountsReceivable', 'Config'];
        await expect(menusInPage).toEqual(menus);
    });

});