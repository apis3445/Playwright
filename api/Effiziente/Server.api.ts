import test, { Page } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import { Server } from '../models/Effiziente/Server';

export class ServerApi {

    apiHelper: ApiHelper;
    api = 'api/Server';

    constructor(private page: Page) {
        const baseURL = process.env.EFFIZIENTE_API_URL ? process.env.EFFIZIENTE_API_URL : 'https://effizienteauthdemo.azurewebsites.net';
        this.apiHelper = new ApiHelper(this.page, baseURL);
    }

    /**
     * Wait for the server is created
     */
    waitForCreateServer() {
        return this.apiHelper.waitForResponse(this.api, 201, 'POST');
    }

    /**
     * Wait for get the list of servers
     */
    waitForGetServers() {
        return this.apiHelper.waitForResponse(this.api);
    }

    /**
     * Delete a server by api
     * @param id Server id
     */
    async deleteServer(id: number) {
        await test.step('Delete server with id: "' + id + '"', async () => {
            const apiResponse = await this.apiHelper.delete(this.api + '/' + id.toString());
            return apiResponse;
        });
    }

    /**
     * Create a server with api
     * @param server Data for the server
     * @returns api response
     */
    async createServer(server: Server) {
        const apiResponse = await this.apiHelper.post(this.api, server);
        return apiResponse;
    }

    /**
     * Get a server by key
     * @param key Server key
     * @returns 
     */
    async getServerByKey(key: string) {
        return await test.step('Get server with the key:' + key, async () => {
            const apiResponse = await this.apiHelper.get(`${this.api}/ByKey/${key}`);
            return apiResponse;
        });
    }
}