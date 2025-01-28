import { AzureReporterOptions } from '@alex_neo/playwright-azure-reporter/dist/playwright-azure-reporter';
import { OrtoniReportConfig } from 'ortoni-report';
import { defineConfig, devices } from '@playwright/test';

import os from 'node:os';
import dotenv from 'dotenv';

const reportConfig: OrtoniReportConfig = {
    open: 'never',
    preferredTheme: 'light',
    filename: 'index',
    projectName: 'Playwright Example',
    testType: 'Release',
    title: 'Playwright report',
    base64Image: true,
    folderPath: 'report',
    showProject: false
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: 'tests',
    globalSetup: './tests/globalSetup.ts',
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
        ['blob'],
        ['junit', { outputFile: 'results.xml' }],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        [
            'playwright-qase-reporter',
            {
                debug: true,
                testops: {
                    api: {
                        token: process.env.QASE_TOKEN,
                    },
                    project: process.env.QASE_PROJECT_CODE,
                    uploadAttachments: true,
                    run: {
                        complete: true,
                    },
                },
            },
        ],
        [
            '@alex_neo/playwright-azure-reporter',
            {
                orgUrl: `https://dev.azure.com/${process.env.ADO_ORGANIZATION}`,
                token: process.env.ADO_TOKEN,
                planId: 398,
                projectName: process.env.ADO_PROJECT,
                logging: true,
                testRunTitle: 'Playwright Test Run',
                publishTestResultsMode: 'testRun',
                uploadAttachments: true,
                attachmentsType: ['screenshot', 'video', 'trace'],
                testRunConfig: {
                    owner: {
                        displayName: process.env.TEST_OWNER,
                    },
                    comment: 'Playwright Test Run',
                    // the configuration ids of this test run, use 
                    // https://dev.azure.com/{organization}/{project}/_apis/test/configurations to get the ids of  your project.
                    // if multiple configuration ids are used in one run a testPointMapper should be used to pick the correct one, 
                    // otherwise the results are pushed to all.
                    configurationIds: [46],
                },
            } as AzureReporterOptions
        ],
        ['./utils/reporter/StepReporter.ts'],
        ['./utils/reporter/AccessibilityReporter.ts'],
        ['ortoni-report', reportConfig],
        ['allure-playwright',
            {
                detail: false, //false to don't include the code as sub step
                suiteTitle: false,
                environmentInfo: {
                    OS: os.platform(), //os name for example darwin
                    Architecture: os.arch(), //architecture for example arm64
                    NodeVersion: process.version, //node version
                },
                categories: [ //To classify errors by category
                    {
                        name: 'Missing file errors',
                        messageRegex: '.*ENOENT: no such file or directory.*'
                    },
                    {
                        name: 'Internal Server Error',
                        messageRegex: '.*Internal Server Error.*',
                    },
                    {
                        name: 'Timeout errors',
                        messageRegex: '.*timeout.*'
                    },
                    {
                        name: 'Accessibility',
                        messageRegex: '.*accessibility.*'
                    }
                ],
            }
        ]
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
            name: 'chrome:latest:Windows 10@lambdatest',
            testMatch: /.*LambdaTestFixture.spec.ts/,
            use: {
                viewport: { width: 1280, height: 720 },
            },
        },
        {
            name: 'desktop-chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },
        {
            name: 'desktop-firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        },
        {
            name: 'desktop-webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',

});

