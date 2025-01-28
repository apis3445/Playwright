import test, { Page } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import { Server } from './Server';
import { AnnotationHelper } from '../../utils/annotations/AnnotationHelper';

export class ServerApi {

    private apiHelper: ApiHelper;
    private api = 'api/Server';
    private annotationHelper = new AnnotationHelper(this.page, '');

    constructor(private page: Page) {
        const baseURL = process.env.EFFIZIENTE_API_URL ?? 'https://effizienteauthdemo.azurewebsites.net';
        this.apiHelper = new ApiHelper(this.page, baseURL, this.annotationHelper);
    }

    /**
     * Wait for the server to be created
     */
    waitForCreateServer() {
        return this.apiHelper.waitForResponse(this.api, 201, 'POST');
    }

    /**
     * Wait to get the list of servers
     */
    waitForGetServers() {
        return this.apiHelper.waitForResponse(this.api);
    }

    /**
     * Delete a server by api
     * @param {number} id Server id
     */
    async deleteServer(id: number) {

        return await test.step(`Delete server with Id: "${id}"`, async () => {
            return await this.apiHelper.delete(`${this.api}/${id}`);
        });
    }

    /**
     * Create a server with api
     * @param server Data to create a server
     * @returns api response
     */
    async createServer(server: Server) {
        return await this.apiHelper.post(this.api, server);
    }

    /**
     * Get a server by key
     * @param {string} key Server key
     * @returns API response
     */
    async getServerByKey(key: string) {
        return await test.step(`Get the server with the key: "${key}"`, async () => {
            const apiResponse = await this.apiHelper.get(`${this.api}/ByKey/${key}`);
            return apiResponse;
        });
    }
}