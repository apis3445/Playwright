import { test } from '@playwright/test';

test.describe('Synthetic login testing', () => {

    // eslint-disable-next-line playwright/expect-expect
    test('Should show dashboard', async ({ page }) => {
        await page.goto('https://effizientedemo.azurewebsites.net');
        await page.getByLabel('Company').fill(process.env.EFFIZIENTE_COMPANY!);
        await page.getByLabel('User').fill(process.env.EFFIZIENTE_NORMAL_USER!);
        await page.getByPlaceholder('Password').fill(process.env.EFFIZIENTE_NORMAL_PASSWORD!);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('app-card-pie').getByRole('img').click({ timeout: 35_000 });
    });
});