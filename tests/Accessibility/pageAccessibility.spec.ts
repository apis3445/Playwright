/* eslint-disable playwright/no-conditional-in-test */
import { expect, Page, test } from '@playwright/test';
import { AnnotationHelper } from '../../utils/annotations/AnnotationHelper';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import { A11yError } from '../../utils/accessibility/models/A11yError';
import { ReportData } from '../../utils/accessibility/models/Report';
import { Target } from '../../utils/accessibility/models/Target';
import { AxeBuilder } from '@axe-core/playwright';
import playwright from 'playwright';
import path from 'path';

test.describe('Test Accessibility By Page', {
    tag: ['@PageAccessibility'],
}, () => {
    // All tests in this describe group will get 0 retry attempts
    test.describe.configure({ retries: 0 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let playAudit: any;
    let page: Page;

    test.beforeAll(async () => {
        // Dynamically import playAudit
        const module = await import('playwright-lighthouse');
        playAudit = module.playAudit;
    });

    /**
    * This example demonstrates how to test an entire page for automatically detectable accessibility violations. 
    * @see https://playwright.dev/docs/accessibility-testing
    */
    test('Check Page accessibility', async ({ browserName }, testInfo) => {
        // eslint-disable-next-line playwright/no-skipped-test
        test.skip(browserName !== 'chromium', 'Lighthouse only works in chrome');
        //You can test any page in environment variable
        const pageToTest = process.env.PAGE_URL!;
        const browser = await playwright['chromium'].launch({
            args: ['--remote-debugging-port=9222'],
        });
        const context = await browser.newContext({
            recordVideo: {
                dir: testInfo.outputPath('videos'),
            }
        });
        //With manual context or page is needed to setup the video
        page = await context.newPage();
        const annotationHelper = new AnnotationHelper(page, pageToTest);
        annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to: ' + pageToTest);
        await page.goto(pageToTest);
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        const violationsLength = accessibilityScanResults.violations.length;
        expect.soft([violationsLength], `Expected no accessibility violations, but found ${violationsLength}`).toBe(0);
        const lighthouseReport = await playAudit({
            page: page,
            port: 9222,
            thresholds: {
                accessibility: 0,
                'best-practices': 0,
            }
        });

        // Extract and log the accessibility score
        const accessibilityScore = lighthouseReport.lhr.categories.accessibility.score! * 100;

        const violations = accessibilityScanResults.violations;
        const errors: A11yError[] = [];

        // Define a mapping between severity levels and border colors
        const severityColors: Record<string, string> = {
            'critical': '#e11912',
            'serious': '#d66f08',
            'moderate': '#8e15ca',
            'minor': '#f04ecd'
        };

        for (const violation of violations) {
            let errorNumber = 0;
            const wcagTags = violation.tags.filter((tag: string) => tag.startsWith('wcag'));
            const targets: Target[] = [];
            const pause = process.env.DEBUG_PAUSE ?? 2000;
            for (const node of violation.nodes) {
                for (const target of node.target) {
                    const element = target.toString();
                    const targetLocator = page.locator(element);

                    if (await targetLocator.isVisible()) {
                        const screenshotPath = path.join(`${violation.id}-${errorNumber++}.png`);
                        await targetLocator.screenshot({ path: screenshotPath });
                        targets.push({
                            element: element,
                            screenshot: screenshotPath
                        });
                    }

                    // Highlight the element with the appropriate border color
                    const borderColor = severityColors[violation.impact ?? ''] || 'black'; // Default to black if severity is not found
                    await page.evaluate(([element, borderColor]) => {
                        const el = document.querySelector(element) as HTMLElement;
                        if (el) {
                            el.style.border = `2px solid ${borderColor}`;
                        }
                    }, [element, borderColor]);
                    const stepDescription = `${violation.id} - ${violation.description} - ${violation.help}`;
                    await annotationHelper.addDescription(stepDescription, borderColor);
                    // eslint-disable-next-line playwright/no-wait-for-timeout
                    await page.waitForTimeout(+pause);
                }
            }

            const error: A11yError = {
                description: violation.description,
                id: violation.id,
                severity: violation.impact?.toString() ?? '',
                helpUrl: violation.helpUrl,
                help: violation.help,
                guideline: violation.tags[1],
                wcagRule: wcagTags.length > 0 ? violation.tags[2] : violation.tags[1],
                target: targets
            };
            errors.push(error);
        }

        const reportData: ReportData = {
            pageKey: pageToTest,
            accessibilityScore: accessibilityScore,
            errors: errors,
            video: '',
        };

        annotationHelper.addAnnotation('A11y', JSON.stringify(reportData));
    });

    test.afterAll(async ({ }, testInfo) => {
        const videoPath = testInfo.outputPath('allyVideo.webm');
        await Promise.all([
            page.video()?.saveAs(videoPath),
            page.close()
        ]);
        testInfo.attachments.push({
            name: 'video',
            path: videoPath,
            contentType: 'video/webm'
        });
    });

});