import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Button } from "../../components/Button";
import { Password } from "../../components/Password";
import { InputText } from "../../components/InputText";
import { AnnotationType } from "../../utils/annotations/AnnotationType";

export class LoginPage extends BasePage {
    readonly userName: InputText;
    readonly password: Password;
    readonly login: Button;

    constructor(page: Page) {
        //We need the page, and a friendly name for the page to be used in reports
        super(page, 'Login');
        const noByRole = false;
        this.userName = new InputText(this.page, this.annotationHelper, '[data-test="username"]', noByRole);
        this.password = new Password(this.page, this.annotationHelper, '[data-test="password"]', noByRole);
        this.login = new Button(this.page, this.annotationHelper, 'Login')
    }

    /**
     * Go to the base Address
     */
    public async goTo() {
        this.annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to the page: "' + this.BASE_URL + '"');
        await this.page.goto('');
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
