import AxeBuilder from '@axe-core/playwright';
import path from 'path';
import { Page } from 'playwright';
import { expect, TestInfo } from 'playwright/test';
import { AnnotationHelper } from '../annotations/AnnotationHelper';
import { A11yError } from './models/A11yError';
import { ReportData } from './models/Report';
import { Target } from './models/Target';

export class AccessibilityHelper {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    playAudit: any;

    constructor(private page: Page, private testInfo: TestInfo, private annotationHelper: AnnotationHelper) {
        // Constructor remains empty
    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async checkAccessibility(pageKey: string, page: any) {
        // Dynamically import playAudit
        const module = await import('playwright-lighthouse');
        this.playAudit = module.playAudit;
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        const violationsLength = accessibilityScanResults.violations.length;
        expect.soft([violationsLength], `Expected no accessibility violations, but found ${violationsLength}`).toBe(0);
        const lighthouseReport = await this.playAudit({
            page: this.page,
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
                    const targetLocator = this.page.locator(element);

                    if (await targetLocator.isVisible()) {
                        const screenshotFile = path.join(`${violation.id}-${errorNumber++}.png`);
                        const target: Target = {
                            element: element,
                            screenshot: screenshotFile
                        }
                        targets.push(target);
                        this.annotationHelper.attachPageScreenshot(screenshotFile, this.testInfo)
                    }

                    // Highlight the element with the appropriate border color
                    const borderColor = severityColors[violation.impact ?? ''] || 'black'; // Default to black if severity is not found
                    await this.page.evaluate(([element, borderColor]) => {
                        const el = document.querySelector(element) as HTMLElement;
                        if (el) {
                            el.style.border = `2px solid ${borderColor}`;
                        }
                    }, [element, borderColor]);
                    const stepDescription = `${violation.id} - ${violation.description} - ${violation.help}`;
                    await this.annotationHelper.addDescription(stepDescription, borderColor);

                    // eslint-disable-next-line playwright/no-wait-for-timeout
                    await this.page.waitForTimeout(+pause);
                    await this.page.evaluate(([element]) => {
                        const el = document.querySelector(element) as HTMLElement;
                        if (el) {
                            el.style.border = '';
                        }
                    }, [element]);
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
            pageKey: pageKey,
            accessibilityScore: accessibilityScore,
            errors: errors,
            video: 'allyVideo.webm',
        };

        this.annotationHelper.addAnnotation('A11y', JSON.stringify(reportData));

    }
}