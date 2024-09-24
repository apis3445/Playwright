/* eslint-disable @typescript-eslint/no-explicit-any */
import test, { APIRequestContext, APIResponse, Page } from '@playwright/test';
import { request } from '@playwright/test';
import { AnnotationHelper } from './annotations/AnnotationHelper';
import { AnnotationType } from './annotations/AnnotationType';

export class ApiHelper {

    constructor(private page: Page, private baseUrl: string, private annotationHelper: AnnotationHelper) {

    }

    /**
     * Create a request with token from localStorage
     */
    async createRequest(baseURL: string) {
        const token = await this.page.evaluate('localStorage["token"]');
        const apiRequest: APIRequestContext = await request.newContext({
            baseURL: baseURL,
            extraHTTPHeaders: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return apiRequest;
    }

    /**
     * Wait for response from url contains the api url
     * @param apiUrl api url to wait until get the response 
     * @param statusCode Status code returned by the api
     * @returns responsePromise
     */
    waitForResponse(apiUrl: string, statusCode = 200, method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'GET') {
        const responsePromise = this.page.waitForResponse(response => response.url().includes(apiUrl) && response.request().method() == method
            && response.status() == statusCode);
        return responsePromise;
    }

    /**
     * Call to api post
     * @param url post url (not base url is needed)
     * @param data data to post
     * @returns 
     */
    async get(url: string): Promise<APIResponse> {
        const apiRequest = await this.createRequest(this.baseUrl);
        return await apiRequest.get(url);
    }

    /**
     * Call to api post
     * @param url post url (not base url is needed)
     * @param data data to post
     * @returns 
     */
    async post(url: string, data: any): Promise<APIResponse> {
        const apiRequest = await this.createRequest(this.baseUrl);
        return await apiRequest.post(url, { data: data });
    }

    /**
     * Call to api post
     * @param url post url (not base url is needed)
     * @param data data to post
     * @returns 
     */
     
    async put(url: string, data: any): Promise<APIResponse> {
        const apiRequest = await this.createRequest(this.baseUrl);
        return await apiRequest.put(url, { data: data });
    }

    /**
     * Call to api delete
     * @param url delete url (not base url is needed)
     * @returns 
     */
    async delete(url: string): Promise<APIResponse> {
        const apiRequest = await this.createRequest(this.baseUrl);
        return await apiRequest.delete(url);
    }

     
    async mockApi(description: string, url: string, jsonData: any) {
        this.annotationHelper.addAnnotation(AnnotationType.Mock, description);
        await test.step(description, async () => {
            await this.page.route(url, async route => {
                await route.fulfill({ body: JSON.stringify(jsonData) });
            });
        });
    }

} 