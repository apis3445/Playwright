import { Page } from '@playwright/test';
import { AnnotationHelper } from '../../utils/annotations/AnnotationHelper';
import { ApiHelper } from '../../utils/ApiHelper';

export class ProductsApi {

    private apiHelper: ApiHelper;
    private readonly api: string = '/products?';
    private annotationHelper = new AnnotationHelper(this.page, '');

    constructor(private page: Page) {
        const baseURL: string = process.env.WEBDRIVERIO_SHOP_API_URL ?? 'https://cdn5.editmysite.com';
        this.apiHelper = new ApiHelper(this.page, baseURL, this.annotationHelper);
    }

    /**
     * Waits for the response of the "Get All Products" API call.
     * 
     * @returns {Promise<any>} A promise that resolves to the response of the API call.
     */
    async waitForGetAllProducts() {
        return await this.apiHelper.waitForResponse('products?page=1');
    }
}