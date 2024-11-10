/* eslint-disable playwright/no-conditional-in-test */
import { Locator, Page, test } from '@playwright/test';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

/**
 * Provides a foundational structure for UI components that can be reused for different components
 * for example input text, combo box, calendar.
 * It integrates with AnnotationHelper to add annotations and highlights for debugging and reporting purposes.
 */
export class BaseComponent {
    locator: Locator;
    componentType: string;
    text?: string;
    label?: string;
    protected isAnnotationEnabled = true;
    protected isHighlightEnabled = false;

    /**
     * Constructor for BaseComponent class.
     * @param page Playwright Page object
     * @param annotationHelper AnnotationHelper object
     */
    constructor(protected page: Page, protected annotationHelper: AnnotationHelper, locator: Locator) {
        this.componentType = this.constructor.name;
        this.locator = locator;
    }

    /**
     * Add an annotation for the html reporter.
     * 
     * @param annotationDescription Description of the annotation to add
     */
    addAnnotation(annotationDescription: string): void {
        if (this.isAnnotationEnabled) {
            this.annotationHelper.addAnnotation(this.componentType, annotationDescription);
        }
    }

    /**
     * Add a step with annotation.
     * @param stepDescription Description to add as annotation
     * @param stepFunction Function to encapsulate as step
     * @returns Promise with step execution
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async addStepWithAnnotation(stepDescription: string, stepFunction: () => Promise<any>): Promise<any> {
        if (this.isAnnotationEnabled) {
            this.addAnnotation(stepDescription);
            await this.highlightStep(stepDescription);
            return this.addStep(stepDescription, stepFunction);
        } else {
            return stepFunction();
        }
    }

    /**
     * Encapsulate a function as a step in the HTML report.
     * @param description Description to add as annotation
     * @param stepFunction Function to encapsulate as step
     * @returns Promise with step execution
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async addStep(stepDescription: string, stepFunction: () => Promise<any>): Promise<any> {
        return await test.step(stepDescription, stepFunction);
    }

    /**
     * Disable annotations for the component.
     */
    disableAnnotations(): void {
        this.isAnnotationEnabled = false;
    }

    /**
     * Highlight a step for demo/debug purposes.
     * @param stepDescription Step description
     */
    async highlightStep(stepDescription: string): Promise<void> {
        if (this.isHighlightEnabled) {
            await test.step('Highlight: ' + stepDescription, async () => {
                await this.locator.highlight();
                await this.annotationHelper.addDescription(stepDescription, '#00008B');
            });
        }
    }

    /**
     * Get the placeholder or label for an input element.
     * @returns Promise with input label
     */
    async getInputLabel(): Promise<string> {
        return await test.step('Get the label for the input', async () => {
            if (this.label)
                return this.label;

            const id = await this.locator.getAttribute('id');
            if (id) {
                const labelElement = this.page.locator(`label[for="${id}"]`);
                if (await labelElement.isVisible())
                    return await labelElement.innerText();
            }

            const placeHolderAttribute = await this.locator.getAttribute('placeholder');
            if (placeHolderAttribute)
                return placeHolderAttribute;

            const ariaLabelAttribute = await this.locator.getAttribute('aria-label');
            if (ariaLabelAttribute)
                return ariaLabelAttribute;
            return '';
        });
    }

    /**
     * Get the text content of the component
     */
    async getText(): Promise<string> {
        return await test.step('Get the Text', async () => {
            if (this.text)
                return this.text;
            this.text = await this.locator.textContent() ?? '';
            return this.text;
        });
    }

    /**
     * Get the text or aria-label for the button
     * @returns Button text
     */
    async getButtonText(): Promise<string> {
        return await test.step('Get the button text', async () => {
            if (this.label)
                return this.label;
            this.label = await this.locator.textContent() ?? '';
            if (!this.label || this.label == '')
                this.label = await this.locator.getAttribute('aria-label') ?? '';
            if (!this.label || this.label == '')
                this.label = await this.locator.getAttribute('title') ?? '';
            return this.label;
        });
    }

}
