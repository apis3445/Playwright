import AxeBuilder from '@axe-core/playwright';
import path from 'path';
import { Page } from 'playwright';
import { expect, TestInfo } from 'playwright/test';
import { AnnotationHelper } from '../annotations/AnnotationHelper';
import { A11yError } from './models/A11yError';
import { ReportData } from './models/Report';
import { Target } from './models/Target';
import { Severity } from './models/Severity';
import { AnnotationType } from '../annotations/AnnotationType';

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
        for (const violation of violations) {
            let errorNumber = 0;
            const wcagTags = violation.tags.filter((tag: string) => tag.startsWith('wcag'));
            const targets: Target[] = [];
            for (const node of violation.nodes) {
                for (const target of node.target) {
                    const element = target.toString();
                    const targetLocator = this.page.locator(element);
                    const severityColor = Severity[violation.impact as keyof typeof Severity] || 'black'; // Default to black if severity is not found
                    const stepDescription = `[${element}] ${violation.id} - ${violation.help}`;
                    await this.annotationHelper.addDescription(stepDescription, severityColor);
                    const excludedTypes = new Set([
                        AnnotationType.Precondition,
                        AnnotationType.PostCondition,
                        AnnotationType.Description,
                        'A11y'
                    ]);

                    const steps: string[] = this.annotationHelper.getAnnotations()
                        .filter(annotation => !excludedTypes.has(annotation.type))
                        .map(annotation => annotation.description ?? 'No steps');
                    if (await targetLocator.isVisible()) {
                        await this.annotationHelper.addBorderToElement(element, severityColor);
                        await targetLocator.highlight();

                        await this.annotationHelper.readDescription(stepDescription);
                        const screenshotFile = path.join(`${violation.id}-${errorNumber++}.png`);
                        const buffer = await this.annotationHelper.attachPageScreenshot(screenshotFile, this.testInfo);
                        const target: Target = {
                            element: element,
                            screenshot: screenshotFile,
                            steps: steps,
                            stepsJson: JSON.stringify(steps),
                            screenshotBase64: buffer.toString('base64')
                        };
                        targets.push(target);
                    }
                    await this.annotationHelper.removeBorder(element);
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
                total: targets.length,
                target: targets,
            };
            errors.push(error);
        }
        const reportData: ReportData = {
            pageKey: pageKey,
            accessibilityScore: accessibilityScore,
            errors: errors,
            video: 'allyVideo.webm',
            criticalColor: Severity.critical,
            seriousColor: Severity.serious,
            moderateColor: Severity.moderate,
            minorColor: Severity.minor,
            adoOrganization: process.env.ADO_ORGANIZATION ?? '',
            adoProject: process.env.ADO_PROJECT ?? '',
            adoPat: process.env.ADO_TOKEN ?? ''
        };
        this.annotationHelper.addAnnotation('A11y', JSON.stringify(reportData));
    }
}