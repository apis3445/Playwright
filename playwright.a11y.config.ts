import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests/Accessibility', // Directory containing your a11y tests
    retries: 0, // No retries for a11y tests
    use: {
        browserName: 'chromium', // Use Chromium for a11y tests
        headless: true, // Run tests in headless mode
        ignoreHTTPSErrors: true,
        video: 'on', // Record video on first retry
    },
    reporter: [
        ['list'],
        ['./utils/accessibility/AccessibilityReporter.ts'], // Custom reporter for a11y tests
    ],
    projects: [
        {
            name: 'desktop-chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ]
};

export default config;