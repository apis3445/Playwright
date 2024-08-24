import { Page } from '@playwright/test';
import { Generic } from '../../../components/Generic';
import { AnnotationHelper } from '../../../utils/annotations/AnnotationHelper';

export class CartItem {
    item = new Generic(this.page, this.annotationHelper, '.cart-items', 'Cart Items');
    name = this.item.locator.locator('.cart-item-header__name');
    unitPrice = this.item.locator.locator('[data-test-actual-cart-price]');

    constructor(protected page: Page, public annotationHelper: AnnotationHelper, public keyPage: string) {

    }

}