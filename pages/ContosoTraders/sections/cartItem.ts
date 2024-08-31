import { Page } from '@playwright/test';
import { Generic } from '../../../components/Generic';
import { AnnotationHelper } from '../../../utils/annotations/AnnotationHelper';

export class CartItem {
    item = new Generic(this.page, this.annotationHelper, '.allProductlist', 'Cart Item');
    name = new Generic(this.page, this.annotationHelper, '.Productname', 'Product Name');
    unitPrice = new Generic(this.page, this.annotationHelper, '.Productprice', 'Product Price');
    qty = new Generic(this.page, this.annotationHelper, '.quantity-display', 'Quantity');

    constructor(protected page: Page, public annotationHelper: AnnotationHelper, public keyPage: string) {

    }

}