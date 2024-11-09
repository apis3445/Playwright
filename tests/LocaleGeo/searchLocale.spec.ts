import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/Google/homePage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import * as allure from 'allure-js-commons';

const locale = process.env.LOCALE ? process.env.LOCALE : 'en-US';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const localeInfo = require(`../../data/${locale}.json`);

test.describe('Locale translations', () => {
    test.use({
        locale: locale,
        timezoneId: localeInfo.timezoneId,
    });

    test('Should display correct translations for specified locale and timezone', {
        tag: ['@LocaleGeo'],
    }, async ({ page }) => {
        await allure.feature('Locale Geo');
        await allure.suite('Google');
        const homePage = new HomePage(page);
        //Go to google home page in the locale
        await homePage.goTo();
        const assertDescription = `Search button text is equal to: "${localeInfo.googleSearch}"`;
        //Add the assertion to the html reporter
        await homePage.addStepWithAnnotation(AnnotationType.Assert, assertDescription, async () => {
            //Check that the google search includes the translated text
            await expect(homePage.googleSearch.locator, assertDescription).toHaveText(localeInfo.googleSearch);
        });
    });
});

