/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page } from '@playwright/test';
import { ContosoBasePage } from './contosoBasePage';
import { Link } from '../../components/Link';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import { ProductsApi } from '../../api/Contoso/products.api';

export class HomePage extends ContosoBasePage {

    allProducts: Link = new Link(this.page, this.annotationHelper, 'All Products', true, true);
    productsApi: ProductsApi = new ProductsApi(this.page);
    products: any[] = [];

    constructor(page: Page) {
        super(page, 'Home');
    }

    /**
     * Go to Contoso traders url
     */
    async goTo() {
        const url = process.env.CONTOSO_URL ?? 'https://cloudtesting.contosotraders.com';
        await this.addStepWithAnnotation(AnnotationType.GoTo, `Go to: "${url}"`, async () => {
            await this.page.goto(url);
        });
    }

    /**
     * Click in all products and set the products returned by api
     */
    async allProductsClick() {
        const responsePromise = this.productsApi.waitForGetAllProducts();
        await this.allProducts.click();
        const responseCreate = await responsePromise;
        this.products = JSON.parse(await responseCreate.text()).products;
    }

    /**
     * Select a random product with the image background, (name is not unique but image is unique)
     */
    async selectRandomProduct() {
        const productIndex = Math.floor(Math.random() * this.products.length);
        this.product = this.products[productIndex];
        await this.page.locator(`div[style*="${this.product.imageUrl}"]`).click();
    }

}