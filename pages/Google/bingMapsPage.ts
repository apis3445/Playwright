import { Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import { Button } from '../../components/Button';
import { Generic } from '../../components/Generic';

export class BingMapsPage extends BasePage {

    readonly locateMe: Button = new Button(this.page, this.annotationHelper, 'button.locateMeBtn', false);
    readonly geoName: Generic = new Generic(this.page, this.annotationHelper, '.geochainContainer', 'Geo Name');
    readonly unCollapse: Button = new Button(this.page, this.annotationHelper, 'button.geochainUncollapse', false);

    public BASE_URL = 'https://www.bing.com/maps';

    constructor(page: Page) {
        //We need the page, and a friendly name for the page to be used in reports
        super(page, 'Bing Maps');
    }

    /**
     * Go to bing maps
     */
    public async goTo() {
        await this.addStepWithAnnotation(AnnotationType.GoTo, `Go to: "${this.BASE_URL}"`, async () => {
            await this.page.goto(this.BASE_URL);
        });
    }
}