import { APIRequestContext, APIResponse } from '@playwright/test';
import { request } from '@playwright/test';

export class ApiHelper {

    apiRequest: APIRequestContext;

    constructor(private page) {

    }

    /**
     * Create a request with token from localstorage
     */
    async createRequest() {
        // var localState = await context.storageState()
        // var token = localState.origins[0].localStorage[0].value;
        const token = await this.page.evaluate('localStorage["jwtToken"]');
        this.apiRequest = await request.newContext({
            baseURL: 'https://api.realworld.io',
            extraHTTPHeaders: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    /**
     * Wait for response from url contains the api url
     * @param apiUrl api url to wait until get the response 
     * @param statusCode Status code returned by the api
     * @returns responsePromise
     */
    async waitForResponse(apiUrl: string, statusCode = 200) {
        const responsePromise = this.page.waitForResponse(response => response.url().includes(apiUrl) && response.request().method() == 'POST'
            && response.status() == statusCode);
        return responsePromise;
    }

    /**
     * Call to api post
     * @param url post url (not base url is needed)
     * @param data data to post
     * @returns 
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async post(url: string, data: any): Promise<APIResponse> {
        await this.createRequest();
        return await this.apiRequest.post(url, { data: data });
    }

    /**
     * Call to api delete
     * @param url delete url (not base url is needed)
     * @returns 
     */
    async delete(url: string): Promise<APIResponse> {
        await this.createRequest();
        return await this.apiRequest.delete(url);
    }

} 