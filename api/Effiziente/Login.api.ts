import { Page } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import { Login } from './Login';
import { AnnotationHelper } from '../../utils/annotations/AnnotationHelper';

export class LoginApi {

    private apiHelper: ApiHelper;
    private annotationHelper: AnnotationHelper;

    constructor(private page: Page) {
        const baseURL = process.env.EFFIZIENTE_API_URL ?? 'https://effizienteauthdemo.azurewebsites.net';
        this.annotationHelper = new AnnotationHelper(this.page, 'login');
        this.apiHelper = new ApiHelper(this.page, baseURL, this.annotationHelper);
    }

    /**
     * Login
     * @param login User to login 
      * @returns Authentication token if login is successful, otherwise an empty string
     */
    async login(login: Login): Promise<string> {
        const response = await this.apiHelper.post('/api/Users/Login', login);
        const statusCode = response.status();
        if (statusCode === 200) {
            const responseBody = await response.json();
            return responseBody.Token;
        }
        else {
            console.log('Status code: ' + statusCode);
            console.log(await response.text());
            console.log(login);
        }
        return '';
    }

}