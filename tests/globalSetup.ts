import { Page, chromium } from '@playwright/test';
import { LoginApi } from '../api/Effiziente/Login.api';
import { Login } from '../api/Effiziente/Login';

const authFolder = 'auth';
const baseUrl = process.env.EFFIZIENTE_URL!;

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(baseUrl);
    let userLogin: Login = {
        Company: process.env.EFFIZIENTE_COMPANY!,
        UserName: process.env.EFFIZIENTE_NORMAL_USER!,
        Password: process.env.EFFIZIENTE_NORMAL_PASSWORD!,
        KeepSession: true,
        Code: 0
    };
    await setStorage(page, userLogin, 'user.json');

    userLogin = {
        Company: process.env.EFFIZIENTE_COMPANY ?? '',
        UserName: process.env.EFFIZIENTE_ADMIN_USER ?? '',
        Password: process.env.EFFIZIENTE_ADMIN_PASSWORD ?? '',
        KeepSession: true,
        Code: 0
    };
    await setStorage(page, userLogin, 'admin.json');
    await browser.close();
}

/**
 * Set storage
 * @param page Playwright page
 * @param userLogin User info for login 
 * @param fileName File name to store state
 */
async function setStorage(page: Page, userLogin: Login, fileName: string) {
    const loginApi = new LoginApi(page);
    const token = await loginApi.login(userLogin);
    await page.evaluate(token => {
        localStorage.setItem('token', token);
    }, token);
    const pathFileName = authFolder + '/' + fileName;
    await page.context().storageState({ path: pathFileName });
}

export default globalSetup;