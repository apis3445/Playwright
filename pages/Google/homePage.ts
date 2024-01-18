import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { Button } from "../../components/Button";
import { InputText } from "../../components/InputText";

export class HomePage extends BasePage {
    readonly search: InputText;
    readonly googleSearch: Button;

    public BASE_URL = "https://www.google.com";

    constructor(page: Page) {
        //We need the page, and a friendly name for the page to be used in reports
        super(page, 'Google');
        //Get the locale from environment variable. 
        //With pipeline can be replaced by parameters.
        const locale = process.env.LOCALE!
        //Load the json with custom locators and values
        const localeInfo = require(`../../data/${locale}.json`);
        //Get the elements by locale
        this.search = new InputText(this.page, this.annotationHelper, `[aria-label="${localeInfo.search}"]`);
        this.googleSearch = new Button(this.page, this.annotationHelper, localeInfo.googleSearch)
    }

}