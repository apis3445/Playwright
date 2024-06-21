import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    testDir: './tests',
    globalSetup: require.resolve('./tests/globalSetup'),
    /* Maximum time one test can run for. */
    timeout: 50 * 1000,

    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 10_000
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 2 : 3,

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 10_000,
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',

        video: 'retain-on-failure',

        screenshot: 'only-on-failure',

    },
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html'],
        ['playwright-qase-reporter',
            {
                apiToken: process.env.QASE_TOKEN,
                projectCode: process.env.QASE_PROJECT_CODE,
                runComplete: true,
                basePath: 'https://api.qase.io/v1',
                logging: true,
                uploadAttachments: true,
                rootSuiteTitle: 'Playwright tests'
            }],
        ['@microsoft/mpt-reporter'] // Microsoft Playwright Testing reporter 
    ],
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chrome:latest:MacOS Catalina@lambdatest',
            testMatch: /.*LambdaTestFixture.spec.ts/,
            use: {
                viewport: { width: 1920, height: 1080 },

            },
        },
        {
            name: 'pw-webkit:latest:MacOS Monterey@lambdatest',
            testMatch: /.*LambdaTestFixture.spec.ts/,
            use: {
                viewport: { width: 1920, height: 1080 },

            },
        },
        {
            name: 'chrome:latest:Windows 10@lambdatest',
            testMatch: /.*LambdaTestFixture.spec.ts/,
            use: {
                viewport: { width: 1280, height: 720 },

            },
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
};

export default config;
