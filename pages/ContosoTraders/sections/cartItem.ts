import { Page } from '@playwright/test';
import { Generic } from '../../../components/Generic';
import { AnnotationHelper } from '../../../utils/annotations/AnnotationHelper';

export class CartItem  {
    item = new Generic(this.page, this.annotationHelper,  '.allProductlist', 'Cart Item' );
    name = this.item.locator.locator('.Productname');
    unitPrice = this.item.locator.locator('.Productprice');
    qty = this.item.locator.locator('.quantity-display');

    constructor(protected page: Page, public annotationHelper: AnnotationHelper, public keyPage: string) {
       
    }


}