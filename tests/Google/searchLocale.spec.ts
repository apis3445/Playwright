import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/Google/homePage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

const locale = process.env.LOCALE ? process.env.LOCALE : 'en-US';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const localeInfo = require(`../../data/${locale}.json`);

test.describe('Locale translations', () => {
    test.use({
        locale: locale,
        timezoneId: localeInfo.timezoneId,
    });

    test('Translations with locale and time zone id', async ({ page }) => {
        //ACT
        const homePage = new HomePage(page);
        //ARRANGE
        await homePage.goTo();
        const assertDescription = `Search button text is equal to: "${localeInfo.googleSearch}"`;
        //ASSERT
        homePage.addAnnotation(AnnotationType.Assert, assertDescription);
        await expect(homePage.googleSearch.locator, assertDescription).toHaveText(localeInfo.googleSearch);
    });
});

