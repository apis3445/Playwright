import { Page } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';

export class ProductsApi {

    apiHelper: ApiHelper;
    api = '/v1/products';

    constructor(private page: Page) {
        const baseURL = process.env.CONTOSO_API_URL ? process.env.CONTOSO_API_URL : 'https://contoso-traders-productsctprd.eastus.cloudapp.azure.com';
        this.apiHelper = new ApiHelper(this.page, baseURL);
    }

    /**
     * Wait for the server is created
     */
    waitForGetAllProducts() {
        return this.apiHelper.waitForResponse(this.api + '/?type=all-products');
    }

}