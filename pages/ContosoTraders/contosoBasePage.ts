import { Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { InputText } from '../../components/InputText';
import { Generic } from '../../components/Generic';
import { Button } from '../../components/Button';

/**
 * ContosoBasePage class representing the base page for Contoso Traders.
 */
export class ContosoBasePage extends BasePage {

    /**
     * Base URL for Contoso Traders API.
     */
    baseURL = process.env.CONTOSO_URL ?? 'https://contoso-traders-productsctprd.eastus.cloudapp.azure.com/v1';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    product: any;
    search = new InputText(this.page, this.annotationHelper, 'Search by product name or');
    shoppingCartItems = new Generic(this.page, this.annotationHelper, '[aria-label="cart"]', 'Items In Shopping cart');
    bag = new Button(this.page, this.annotationHelper, 'cart');

    /**
     * Constructor for ContosoBasePage.
     * @param page Playwright page
     * @param keyPage Key page identifier
     */
    constructor(page: Page, public readonly keyPage: string) {
        //We need the page, and a friendly name for the page to be used in reports
        super(page, keyPage);
    }
}