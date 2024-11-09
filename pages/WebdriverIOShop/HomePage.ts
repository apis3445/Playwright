import { Page } from '@playwright/test';
import { Link } from '../../components/Link';
import { ProductsApi } from '../../api/WebdriverIO/products.api';
import { WebDriverBasePage } from './WebDriverBasePage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

export class HomePage extends WebDriverBasePage {
    shopAll = new Link(this.page, this.annotationHelper, 'Shop All', true, true);
    productsApi: ProductsApi = new ProductsApi(this.page);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: any[] = [];

    constructor(page: Page) {
        super(page, 'Home');
    }

    /**
     * Go to the WebDriver shop home page
     */
    async goTo() {
        const baseURL = process.env.WEBDRIVERIO_SHOP || 'https://shop.webdriver.io';
        await this.addStepWithAnnotation(AnnotationType.GoTo, `Go to: "${baseURL}"`, async () => {
            await this.page.goto(baseURL);
        });
    }

    /**
     * Click in show all button and get the products
     */
    async showAllClick() {
        const responsePromise = this.productsApi.waitForGetAllProducts();
        await this.shopAll.click();
        const promise = await responsePromise;
        const responseText = JSON.parse(await promise.text());
        this.products = responseText.data;
    }

    /**
     * Select a random product with the image background, (name is not unique but image is unique)
     */
    async selectRandomProduct() {
        const productIndex = Math.floor(Math.random() * this.products.length);
        const product = this.products[productIndex];
        const productName = product.name;
        const stepDescription = `Click in the product: "${productName}"`;
        return this.addStepWithAnnotation(AnnotationType.Step, stepDescription, async () => {
            await this.page.locator(`p[title="${productName}"]`).click();
            return product;
        });
    }
}