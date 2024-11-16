import test, { expect } from '@playwright/test';
import { BingMapsPage } from '../../pages/Google/bingMapsPage';
import * as allure from 'allure-js-commons';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

test.describe('Geo Location Test', () => {
    //You need the longitude, latitude and geolocation permission to access to the geolocation
    test.use({
        geolocation: { longitude: 11.57549, latitude: 48.13743 },
        permissions: ['geolocation'],
    });

    test('The bing maps is located to munich', {
        tag: ['@LocaleGeo'],
    }, async ({ page, browserName }) => {
        await allure.feature('Locale Geo');
        await allure.suite('Bing Maps');
        // eslint-disable-next-line playwright/no-skipped-test
        test.skip(browserName == 'firefox', 'Geolocation not work in firefox');

        //This is the location label for the munich geolocation
        const geoName = 'GermanyBavariaMunich (District)';
        const bingMapsPage = new BingMapsPage(page);
        await bingMapsPage.goTo();
        //With click in the locate button the map will be centered in your current geolocation
        await bingMapsPage.locateMe.click();
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (await bingMapsPage.unCollapse.IsVisible())
            await bingMapsPage.unCollapse.click();
        const assertionDescription = `Geo name is equal to: "${geoName}"`;
        //Add the assertion to the html reporter annotations
        await bingMapsPage.addStepWithAnnotation(AnnotationType.Assert, assertionDescription, async () => {
            //Check the current geolocation label is set to Munich
            await expect(bingMapsPage.geoName.locator, assertionDescription).toHaveText(geoName);
        });
    });
});