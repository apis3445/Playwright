
import { Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { Button } from '../../components/Button';
import { InputText } from '../../components/InputText';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

export class HomePage extends BasePage {
    readonly search: InputText;
    readonly googleSearch: Button;

    public BASE_URL = 'https://www.google.com';

    constructor(page: Page) {
        //We need the page, and a friendly name for the page to be used in reports
        super(page, 'Google');
        //Get the locale from environment variable. 
        //With pipeline can be replaced by parameters.
        const locale = process.env.LOCALE ? process.env.LOCALE : 'en-US';
        //Load the json with custom locators and values

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const localeInfo = require(`../../data/${locale}.json`);
        //Get the elements by locale 
        this.search = new InputText(this.page, this.annotationHelper, `[aria-label="${localeInfo.search}"]`, false);
        this.googleSearch = new Button(this.page, this.annotationHelper, localeInfo.googleSearch);
    }

    /**
     * Go to google home page
     */
    public async goTo() {
        await this.addStepWithAnnotation(AnnotationType.GoTo, `Go to: "${this.BASE_URL}"`, async () => {
            await this.page.goto(this.BASE_URL);
        });
    }
}