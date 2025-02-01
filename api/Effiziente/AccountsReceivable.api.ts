import { Page } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import { AnnotationHelper } from '../../utils/annotations/AnnotationHelper';
import summary from '../../api/data/summary.json';
import summaryExpiration from '../../api/data/summaryExpiration.json';
import top5Type from '../../api/data/top5Type.json';
import top5Delay from '../../api/data/top5Delay.json';
import top5Total from '../../api/data/top5Total.json';
import top10Limit1 from '../../api/data/top10Limit1.json';
import top10Limit2 from '../../api/data/top10Limit2.json';
import top10Limit3 from '../../api/data/top10Limit3.json';
import top10ToExpire from '../../api/data/top10ToExpire.json';

export class AccountReceivableApi {

    apiHelper: ApiHelper;
    private annotationHelper = new AnnotationHelper(this.page, '');

    constructor(private page: Page) {
        const baseURL = process.env.EFFIZIENTE_API_URL ? process.env.EFFIZIENTE_API_URL : 'https://effizienteauthdemo.azurewebsites.net';
        this.apiHelper = new ApiHelper(this.page, baseURL, this.annotationHelper);
    }

    /**
     * Change the summary to fixed json file to get always the same data
     */
    async mockSummary() {
        const stepDescription = 'Modify the summary with fixed data';
        await this.apiHelper.mockApi(stepDescription, '/api/Collection/Summary', summary);
    }

    /**
     * Change the summary expiration api response to fixed json file to get always the same data
     */
    async mockSummaryExpiration() {
        const stepDescription = 'Modify the "Sumary Expiration" with fixed data';
        await this.apiHelper.mockApi(stepDescription, '/api/Collection/DueDateSummary', summaryExpiration);
    }

    /**
     * Change the top 5 delay api response to fixed json file to get always the same data
     */
    async mockTop5Delay() {
        const stepDescription = 'Modify the "Top 5 delay" with fixed data';
        await this.apiHelper.mockApi(stepDescription, '/api/Collection/Top5DDO', top5Delay);
    }

    /**
     * Change the top 5 total api response to fixed json file to get always the same data
     */
    async mockTop5Total() {
        const stepDescription = 'Modify the "Top 5 total" with fixed data';
        await this.apiHelper.mockApi(stepDescription, '/api/Collection/Top5Total', top5Total);
    }

    /**
     * Change the top 5 type api response to fixed json file to get always the same data
     */
    async mockTop5Type() {
        const stepDescription = 'Modify the "Top 5 type" with fixed data';
        await this.apiHelper.mockApi(stepDescription, '/api/Collection/Top5Type', top5Type);
    }

    /**
     * Change the top 10 limit 1 api response to fixed json file to get always the same data
     */
    async mockTop10Limit1() {
        const stepDescription = 'Modify the "Top 10 Limit 1" with fixed data';
        await this.apiHelper.mockApi(stepDescription, '/api/Collection/Top10Limit1', top10Limit1);
    }

    /**
     * Change the top 10 limit 2 api response to fixed json file to get always the same data
     */
    async mockTop10Limit2() {
        const stepDescription = 'Modify the "Top 10 Limit 2" with fixed data';
        await this.apiHelper.mockApi(stepDescription, '/api/Collection/Top10Limit2', top10Limit2);
    }

    /**
     * Change the top 10 limit 3 api response to fixed json file to get always the same data
     */
    async mockTop10Limit3() {
        const stepDescription = 'Modify the "Top 10 Limit 3" with fixed data';
        await this.apiHelper.mockApi(stepDescription, '/api/Collection/Top10Limit3', top10Limit3);
    }

    /**
     * Change the top 10 next to expire response to fixed json file to get always the same data
     */
    async mockTop10ToExpire() {
        const stepDescription = 'Modify the "Top 10 To Expire" with fixed data';
        await this.apiHelper.mockApi(stepDescription, '/api/Collection/Top10ToExpire', top10ToExpire);
    }

    /**
     * Mock all apis for dashboard
     */
    async mockAllApis() {
        await this.mockSummary();
        await this.mockSummaryExpiration();
        await this.mockTop5Delay();
        await this.mockTop5Total();
        await this.mockTop5Type();
        await this.mockTop10Limit1();
        await this.mockTop10Limit2();
        await this.mockTop10Limit3();
        await this.mockTop10ToExpire();
    }
}