import { test } from '../../fixtures/lambdaTestFixture';

// doesn't share the logged-in session
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
    // eslint-disable-next-line playwright/expect-expect
    test('Login with valid user load inventory page', async ({ page, loginPage }) => {
        //ACT
        await loginPage.goTo();
        //For security is better add your user info in environment variables or some Key Value service 
        //ARRANGE
        await loginPage.loginWithUser(process.env.USER_NAME!, process.env.PASSWORD!);
        const expectedPage = loginPage.BASE_URL + '/inventory.html';
        //ASSERT
        loginPage.AssertEqual(expectedPage, page.url(), 'Check URL Page equal to: "' + expectedPage + '"');
    });
});