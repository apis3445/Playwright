import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/Google/homePage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

const locale = process.env.LOCALE ? process.env.LOCALE : 'en-US'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const localeInfo = require(`../../data/${locale}.json`);

test.describe('Locale translations', async () => {
    test.use({
        locale: locale,
        timezoneId: localeInfo.timezoneId,
    });

    test('translations with locale and time zone id', async ({ page }) => {
        //ACT
        const homePage = new HomePage(page);
        //ARRANGE
        await homePage.goTo(homePage.BASE_URL);
        //ASSERT
        homePage.addAnnotation(AnnotationType.Assert, `Search button text is equal to: "${localeInfo.googleSearch}"`);
        await expect(homePage.googleSearch.locator).toHaveText(localeInfo.googleSearch);
    });
})

