import { test } from '../../fixtures/lambdaTestFixture';
import * as allure from 'allure-js-commons';

// doesn't share the logged-in session
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
    // eslint-disable-next-line playwright/expect-expect
    test('Login with valid user load inventory page', {
        tag: ['@Fixture'],
    }, async ({ page, loginPage }) => {
        await allure.feature('Fixture');
        await allure.suite('LambdaTest');
        await loginPage.goTo();
        //For security is better add your user info in environment variables or some Key Value service 
        await loginPage.loginWithUser(process.env.USER_NAME!, process.env.PASSWORD!);
        const expectedPage = loginPage.BASE_URL + '/inventory.html';
        const stepDescription = `Check URL Page equal to: "${expectedPage}`;
        await loginPage.AssertEqual(expectedPage, page.url(), stepDescription);
    });
});