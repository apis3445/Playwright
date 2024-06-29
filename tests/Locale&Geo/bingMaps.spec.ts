import test, { expect } from '@playwright/test';
import { BingMapsPage } from '../../pages/Google/bingMapsPage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import exp from 'constants';

test.describe('Geo Location Test', () => {
    //You need the longitude, latitude and geolocation permission to access to the geolocation
    test.use({
        geolocation: { longitude: 11.57549 , latitude: 48.13743 },
        permissions: ['geolocation'],
    });
      
    test('The bing maps is located to munich', async ({ page }) => {
        //This is the location label for the munich geolocation
        const geoName = 'GermanyBavariaMunich (District)';
        const bingMapsPage = new BingMapsPage(page);
        await bingMapsPage.goTo();
        //With click in the locate button the map will be centered in your current geolocation
        await bingMapsPage.locateMe.click();
        await expect(bingMapsPage.locateMe.locator).toBeVisible();
        const assertionDescription = 'Geo name is equal to:' + geoName; 
        //Add the assertion to the html reporter annotations
        bingMapsPage.addAnnotation(AnnotationType.Assert, assertionDescription);
        //Check the current geolocation label is set to Munich
        await expect(bingMapsPage.geoName.locator, assertionDescription).toHaveText(geoName);
    });
});