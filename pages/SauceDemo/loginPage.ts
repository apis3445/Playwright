import { Page } from '@playwright/test';
import { Button } from '../../components/Button';
import { InputPassword } from '../../components/InputPassword';
import { InputText } from '../../components/InputText';
import { BasePage } from '../basePage';

export class LoginPage extends BasePage {
    readonly userName: InputText;
    readonly password: InputPassword;
    readonly login: Button;
    public BASE_URL = process.env.BASE_URL!;

    constructor(page: Page) {
        //We need the page, and a friendly name for the page to be used in reports
        super(page, 'Login');
        const noByRole = false;
        this.userName = new InputText(this.page, this.annotationHelper, '[data-test="username"]', noByRole);
        this.password = new InputPassword(this.page, this.annotationHelper, '[data-test="password"]', noByRole);
        this.login = new Button(this.page, this.annotationHelper, 'Login');
    }

    /**
     * Login with the user name and password
     * @param userName User Name
     * @param password Password
     * We suggest don't store passwords in the code
     */
    public async loginWithUser(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.login.click();
    }
}
