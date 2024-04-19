import test, { Page } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';

export class ServerApi {

    apiHelper: ApiHelper;

    constructor(private page: Page) {
        const baseURL = process.env.EFFIZIENTE_API_URL ? process.env.EFFIZIENTE_API_URL : 'https://effizienteauthdemo.azurewebsites.net';
        this.apiHelper = new ApiHelper(this.page, baseURL);
    }

    /**
     * Wait for the server is created
     */
    waitForCreateServer() {
        const api = 'api/Server';
        return this.apiHelper.waitForResponse(api, 201, 'POST');
    }

    /**
     * Wait for the server is created
     */
    waitForGetServers() {
        const api = 'api/Server';
        return this.apiHelper.waitForResponse(api);
    }

    /**
     * Delete a server by api
     * @param id Server id
     */
    async deleteServerByApi(id: number) {
        const api = 'api/Server/';
        await test.step('Delete server with id: "' + id + '"', async () => {
            const apiResponse = await this.apiHelper.delete(api + id.toString());
            return apiResponse;
        });
    }

}