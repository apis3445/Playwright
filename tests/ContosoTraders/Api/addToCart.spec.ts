import { test } from '@playwright/test';

test.describe('Contoso Traders', () => {

    // eslint-disable-next-line playwright/expect-expect
    test('Should add an item to the cart', async ({ page }) => {

        await page.goto('https://cloudtesting.contosotraders.com');
    });

});