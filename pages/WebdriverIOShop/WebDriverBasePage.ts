import { Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { Generic } from '../../components/Generic';
import { Button } from '../../components/Button';

export class WebDriverBasePage extends BasePage {
    cart = new Button(this.page, this.annotationHelper, 'button[aria-label="Cart icon"]', false);
    shoppingCartItems = new Generic(this.page, this.annotationHelper, 'span.nav-icon__cart-number', 'Items In Shopping cart');

    constructor(page: Page, public readonly keyPage: string) {
        //We need the page, and a friendly name for the page to be used in reports
        super(page, keyPage);
    }
}