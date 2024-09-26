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

    },
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['./utils/reporter/StepReporter.ts'],
        ['./utils/reporter/AccessibilityReporter.ts']
    ],
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'desktop-chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',

};

export default config;
