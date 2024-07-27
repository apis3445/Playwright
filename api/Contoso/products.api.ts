import { Page } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import { AnnotationHelper } from '../../utils/annotations/AnnotationHelper';

export class ProductsApi {

    private apiHelper: ApiHelper;
    private readonly api: string = '/v1/products';
    private annotationHelper = new AnnotationHelper(this.page, '');

    constructor(private page: Page) {
        const baseURL: string = process.env.CONTOSO_API_URL ?? 'https://contoso-traders-productsctprd.eastus.cloudapp.azure.com';
        this.apiHelper = new ApiHelper(this.page, baseURL, this.annotationHelper);
    }

    /**
     * Waits for the response of the "Get All Products" API call.
     * 
     * @returns {Promise<any>} A promise that resolves to the response of the API call.
     */
    async waitForGetAllProducts() {
        return await this.apiHelper.waitForResponse(`${this.api}/?type=all-products`);
    }
}