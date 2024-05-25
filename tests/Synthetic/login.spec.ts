import { test } from '@playwright/test';

test.describe('Synthetic login testing', () => {

    // eslint-disable-next-line playwright/expect-expect
    test('Should show dashboard', async ({ page }) => {
        //TODO: replace with environment variables when PerfAgents supports ENV variables
        await page.goto('https://effizientedemo.azurewebsites.net');
        await page.getByLabel('Company').fill('Demo');
        await page.getByLabel('User').fill('Demo');
        await page.getByPlaceholder('Password').fill('Demo');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('app-card-pie').getByRole('img').click({ timeout: 35_000 });
    });
});