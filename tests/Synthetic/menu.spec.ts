import { expect, test } from '@playwright/test';

test.describe('Synthetic testing', () => {
    const baseURL = process.env.EFFIZIENTE_URL!;
    const baseAPI_URL = process.env.EFFIZIENTE_API_URL!;
    let token = '';

    test.beforeEach(async ({ request }) => {
        const userLogin = {
            Company: process.env.EFFIZIENTE_COMPANY,
            UserName: process.env.EFFIZIENTE_NORMAL_USER,
            Password: process.env.EFFIZIENTE_NORMAL_PASSWORD,
            KeepSession: true,
            Code: 0
        };
        const loginAPi = baseAPI_URL + '/api/Users/Login';

        const response = await request.post(loginAPi, { data: userLogin });
        const responseBody = await response.json();
        token = responseBody.Token;
    });

    test('Should show dashboard', async ({ page }) => {
        const dashboardPageUrl = baseURL + '/AccountsReceivable/dashboard';
        const stepDescription = 'Go to:' + baseURL;
        await test.step(stepDescription, async () => {
            test.info().annotations.push({ type: 'Navigation', description: stepDescription });
            await page.goto(baseURL);
            await page.evaluate(token => {
                localStorage.setItem('token', token);
            }, token);
        });
        await page.goto(dashboardPageUrl);
        const timeout = 35_000;
        await expect(page.locator('#top5 canvas')).toBeVisible({ timeout: timeout });
        await expect(page.locator('#top5Debt canvas')).toBeVisible({ timeout: timeout });
        await expect(page.locator('#top5DaysDelay canvas')).toBeVisible({ timeout: timeout });
        await expect(page.locator('#summaryExpiration canvas')).toBeVisible({ timeout: timeout });
        const topMenuLocator = 'app-menu > p-menubar > .p-menubar > p-menubarsub > ul > li > .p-menuitem-content > a > .p-menuitem-text';
        const menusInPage = await page.locator(topMenuLocator).allInnerTexts();
        const menus = ['AccountsReceivable', 'Config'];
        await expect(menusInPage).toEqual(menus);
    });

});