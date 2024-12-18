import { chromium, test as baseTest } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/SauceDemo/loginPage';

interface pages {
    loginPage: LoginPage
}

// LambdaTest capabilities
const capabilities = {
    browserName: 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: 'latest',
    'LT:Options': {
        platform: 'Windows 10',
        build: 'Playwright Test ',
        name: 'Playwright Test Lambda',
        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,
        network: true,
        video: true,
        visual: true,
        console: true,
        tunnel: false, // Add tunnel configuration if testing locally hosted webpage
        tunnelName: '', // Optional
        geoLocation: 'US', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    },
};

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName: string, testName: string) => {
    const config = configName.split('@lambdatest')[0];
    const [browserName, browserVersion, platform] = config.split(':');
    capabilities.browserName = browserName
        ? browserName
        : capabilities.browserName;
    capabilities.browserVersion = browserVersion
        ? browserVersion
        : capabilities.browserVersion;
    capabilities['LT:Options']['platform'] = platform
        ? platform
        : capabilities['LT:Options']['platform'];
    capabilities['LT:Options']['name'] = testName;
};

const testPages = baseTest.extend<pages>({

    page: async ({ }, use, testInfo) => {
        const fileName = testInfo.file.split(path.sep).pop();
        if (testInfo.project.name.match(/lambdatest/)) {
            modifyCapabilities(
                testInfo.project.name,
                `${testInfo.title} - ${fileName}`
            );
            const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
        ${encodeURIComponent(JSON.stringify(capabilities))}`);
            const ltPage = await browser.newPage(testInfo.project.use);
            await use(ltPage);
            const testStatus = {
                action: 'setTestStatus',
                arguments: {
                    status: testInfo.status,
                    remark: testInfo.error?.stack || testInfo.error?.message,
                },
            };
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            await ltPage.evaluate(() => { },
                `lambdatest_action: ${JSON.stringify(testStatus)}`);
            await ltPage.close();
            await browser.close();
        } else {
            const browser = await chromium.launch();
            const context = await browser.newContext();
            const page = await context.newPage();
            await use(page);
        }
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});

export const test = testPages;
