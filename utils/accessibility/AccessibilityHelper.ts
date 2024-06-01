import { expect, Page, test, TestInfo } from '@playwright/test';
import { AnnotationHelper } from '../annotations/AnnotationHelper';
import { AnnotationType } from '../annotations/AnnotationType';
import { PageErrors } from './PageErrors';
import { AxeErrors } from './AxeErrors';
import { AxeError } from './models/AxeError';
import { Annotation } from '../annotations/Annotation';
import { Dashboard } from './Dashboard';
import AxeBuilder from '@axe-core/playwright';

export class AccessibilityHelper {
    private currentUrl = '';
    private annotationHelper: AnnotationHelper;
    private pageErrors: PageErrors;
    private currentAxeErrors: AxeError[] = [];
    private totalErrors: number;

    constructor(protected page: Page, protected testInfo: TestInfo) {
        this.pageErrors = new PageErrors(this.testInfo);
        this.totalErrors = 0;
        this.annotationHelper = new AnnotationHelper(this.page, '');
    }

    /**
     * Check accessibility
     * @param accessibilityScanResults accessibility scan results
     */
    async checkAccessibility(keyPage: string, annotations: Annotation[]) {
        this.annotationHelper = new AnnotationHelper(this.page, keyPage);
        const stepDescription = 'Check accessibility for page: ' + keyPage;
        this.annotationHelper.addAnnotation(AnnotationType.Assert, stepDescription);
        // eslint-disable-next-line playwright/valid-title
        await test.step(stepDescription, async () => {
            const page = this.page;
            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
            this.currentUrl = accessibilityScanResults.url;
            const axeErrors = new AxeErrors(this.currentUrl, annotations);
            const accessibilityErrors = accessibilityScanResults.violations;
            this.currentAxeErrors = axeErrors.mapElements(keyPage, accessibilityErrors);
            this.totalErrors += this.currentAxeErrors.length;
            await this.addAnnotations();
            await this.pageErrors.attachBugsByPage(keyPage, this.currentAxeErrors);
            const dashboard = new Dashboard(this.testInfo);
            await dashboard.saveToFile(keyPage, this.currentAxeErrors);
            await dashboard.generateDashboard();
            expect.soft(accessibilityErrors.length, 'Accessibility errors should be 0').toBe(0);
        });
    }

    /**
     * Add annotations to the report
     */
    async addAnnotations() {
        await test.step('Add accessibility annotations', async () => {
            // eslint-disable-next-line playwright/no-conditional-in-test
            const pause = process.env.DEBUG_PAUSE ? +process.env.DEBUG_PAUSE : 2000;
            for (const axeError of this.currentAxeErrors) {
                const targetLocator = this.page.locator(axeError.target).first();
                const type = `${axeError.errorNumber}.${axeError.id}`;
                const howToFix = axeError.summary;
                const stepDescription = `${type} - ${howToFix}`;
                await this.annotationHelper.removeDescription();
                const fileName = axeError.screenshot;
                await this.annotationHelper.addScreenshot(targetLocator, fileName, this.testInfo);
                await this.annotationHelper.addDescription(targetLocator, stepDescription, axeError.impact);
                this.annotationHelper.addAnnotation(type, howToFix);
                // eslint-disable-next-line playwright/no-wait-for-timeout
                await this.page.waitForTimeout(pause);
                expect.soft(axeError.id, stepDescription).toBeNull();
            }
        });
    }
}
