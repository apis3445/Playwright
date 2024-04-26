import { Page } from '@playwright/test';
import { ContosoBasePage } from './contosoBasePage';
import { Button } from '../../components/Button';

export class ProductDetailPage extends ContosoBasePage {

    addToBag: Button = new Button(this.page, this.annotationHelper, 'Add to Bag');

    constructor(page: Page) {
        super(page, 'Product Detail');
    }

}