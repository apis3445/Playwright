 
import { Page } from '@playwright/test';
import { ContosoBasePage } from './contosoBasePage';
import { CartItem } from './sections/cartItem';

export class CartPage extends ContosoBasePage {

    cartItem: CartItem = new CartItem(this.page, this.annotationHelper, this.keyPage);

    constructor(page: Page) {
        super(page, 'Cart');
    }
}