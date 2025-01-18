import { AzureReporterOptions } from '@alex_neo/playwright-azure-reporter/dist/playwright-azure-reporter';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import os from 'node:os';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    /* Maximum time one test can run for. */
    timeout: 80 * 1000,

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
    retries: 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 2 : 3,

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 10_000,
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on',

        video: 'on',

        screenshot: 'on',

        contextOptions: {
            permissions: [], // Add specific permissions only if needed
        },

    },
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['junit', { outputFile: 'results.xml' }],
        ['./utils/reporter/StepReporter.ts'],
        ['./utils/reporter/AccessibilityReporter.ts'],
        [
            '@alex_neo/playwright-azure-reporter',
            {
                orgUrl: 'https://dev.azure.com/' + process.env.ADO_ORGANIZATION,
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
        ['allure-playwright',
            {
                detail: false,
                suiteTitle: false,
                links: {
                    link: {
                        urlTemplate: 'https://github.com/allure-framework/allure-js/blob/main/%s',
                    },
                    issue: {
                        urlTemplate: 'https://github.com/allure-framework/allure-js/issues/%s',
                        nameTemplate: 'ISSUE-%s',
                    },
                },
                environmentInfo: {
                    OS: os.platform(),
                    Architecture: os.arch(),
                    NodeVersion: process.version,
                },
                categories: [
                    {
                        name: 'Missing file errors',
                        messageRegex: /^ENOENT: no such file or directory/,
                    },
                ],
            }
        ]
    ],
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'desktop-chromium',
            use: {
                ...devices['Desktop Chrome'],
            }
        }
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',

});

