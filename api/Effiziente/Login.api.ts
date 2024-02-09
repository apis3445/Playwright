import { Page } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import { Login } from '../models/Login';

export class LoginApi {

    apiHelper: ApiHelper;

    constructor(private page: Page) {
        const baseURL = process.env.EFFIZIENTE_API_URL ? process.env.EFFIZIENTE_API_URL : 'https://effizienteauthdemo.azurewebsites.net';
        this.apiHelper = new ApiHelper(this.page, baseURL);
    }

    /**
     * Login
     * @param login User to login 
     * @returns Response
     */
    async login(login: Login) {
        const response = await this.apiHelper.post('/api/Usuarios/Login', login);
        console.log(await response.text());
        const responseBody = await response.json();
        return responseBody.Token;
    }

}