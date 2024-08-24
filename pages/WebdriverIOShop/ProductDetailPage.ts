import { Page } from '@playwright/test';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { WebDriverBasePage } from './WebDriverBasePage';
import { Generic } from '../../components/Generic';

export class ProductDetailPage extends WebDriverBasePage {
    private readonly NOT_AVAILABLE_TEXT = 'Out of stock';
    color = new Select(this.page, this.annotationHelper, 'select[name="dropdown-0"]', false);
    size = new Select(this.page, this.annotationHelper, 'select[name="dropdown-1"]', false);
    addToCart = new Button(this.page, this.annotationHelper, 'button[data-dd-action-name="add-to-cart"]', false);
    productPrice = new Generic(this.page, this.annotationHelper, 'h3.product__price', 'Product Price');

    constructor(page: Page) {
        super(page, 'Product Detail');
    }

    async selectAvailableSize() {
        if (await this.size.locator.isVisible())
            await this.size.selectRandomOptionWithoutText(this.NOT_AVAILABLE_TEXT);
    }
}