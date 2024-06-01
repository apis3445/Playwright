/* eslint-disable playwright/expect-expect */
import { expect, test } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test.describe('AI Zero Step', () => {
    test('Should show dashboard after login', async ({ page, browserName }) => {
        // eslint-disable-next-line playwright/no-skipped-test
        test.skip(browserName !== 'chromium', 'Zero Steps only works in chromium');

        const baseURL = process.env.EFFIZIENTE_URL!;
        const company = process.env.EFFIZIENTE_COMPANY;
        const userName = process.env.EFFIZIENTE_NORMAL_USER;
        const password = process.env.EFFIZIENTE_NORMAL_PASSWORD;

        await page.goto(baseURL);

        // An object with page and test must be passed into every call
        const aiArgs = { page, test };
        await ai(`Type "${company}" in the "Company" textbox`, aiArgs);
        await ai(`Type "${userName}" in the "User" textbox`, aiArgs);
        await ai(`Type "${password}" in the "Password" textbox`, aiArgs);
        await ai('Click in "Login" button', aiArgs);
        await expect(page.locator('#top5 canvas')).toBeVisible({ timeout: 35_000 });
    });
});