import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Synthetic login testing', () => {

    // eslint-disable-next-line playwright/expect-expect
    test('Should show dashboard', {
        tag: ['@PerfAgents'],
    }, async ({ page }) => {
        await allure.feature('Synthetic');
        await allure.suite('PerfAgents');
        await page.goto('https://effizientedemo.azurewebsites.net');
        await page.getByLabel('Company').fill(process.env.EFFIZIENTE_COMPANY!);
        await page.getByLabel('User').fill(process.env.EFFIZIENTE_NORMAL_USER!);
        await page.getByPlaceholder('Password').fill(process.env.EFFIZIENTE_NORMAL_PASSWORD!);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('app-card-pie').getByRole('img').click({ timeout: 35_000 });
    });
});