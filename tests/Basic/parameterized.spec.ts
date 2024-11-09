import { test } from '@playwright/test';
import { LoginPage } from '../../pages/SauceDemo/loginPage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import * as allure from 'allure-js-commons';

// doesn't share the logged-in session
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login with Parameters', () => {
    [
        { userName: 'standard_user' },
        { userName: 'visual_user' },
    ].forEach(({ userName }) => {
        // eslint-disable-next-line playwright/expect-expect
        test(`Login with "${userName}" from parameters will load inventory page`, {
            tag: ['@Basic', '@[395]'],
            annotation: [
                { type: AnnotationType.Description, description: 'Login with valid user on Sauce Demo' },
                { type: AnnotationType.Precondition, description: 'A valid username and password' },
            ],
        }, async ({ page }) => {
            await allure.feature('Basic');
            await allure.suite('Sauce demo');
            await allure.parameter('userName', userName);
            const loginPage = new LoginPage(page);
            await loginPage.goTo();
            //For security is better add your user info in environment variables or some Key Value service 
            await loginPage.loginWithUser(userName, process.env.PASSWORD!);
            const expectedPage = loginPage.BASE_URL + '/inventory.html';
            const stepDescription = `Check URL Page is equal to: ${expectedPage}"`;
            await loginPage.AssertEqual(expectedPage, page.url(), stepDescription);
        });
    });
});