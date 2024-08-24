import { Page } from '@playwright/test';
import { WebDriverBasePage } from './WebDriverBasePage';
import { Generic } from '../../components/Generic';
import { CartItem } from './sections/CartItem';

export class CartPage extends WebDriverBasePage {
    subTotal = new Generic(this.page, this.annotationHelper, '[data-test-id="subtotal-line-item-price"]', 'SubTotal');
    cartItem: CartItem = new CartItem(this.page, this.annotationHelper, this.keyPage);

    constructor(page: Page) {
        super(page, 'Cart');
    }
}