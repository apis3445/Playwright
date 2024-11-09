import { Page, test, expect } from '@playwright/test';
import { AnnotationType } from '../utils/annotations/AnnotationType';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class BasePage {

    public stepDescription = '';
    protected isAnnotationEnabled = true;
    protected annotationHelper = new AnnotationHelper(this.page, this.keyPage);

    constructor(protected readonly page: Page, public readonly keyPage: string) {

    }

    /**
     * Go to the base Address
     */
    public async goTo() {
        const url = process.env.BASE_URL ?? 'https://www.saucedemo.com';
        const stepDescription = `Go to: "${url}"`;
        await this.addStepWithAnnotation(AnnotationType.GoTo, stepDescription, async () => {
            await this.page.goto(url);
        });
    }

    /**
     * Add annotation
     * @param type Type of the annotation (shows in bold)
     * @param description Description for the annotation
     */
    addAnnotation(type: AnnotationType, description: string) {
        this.annotationHelper.addAnnotation(type, description);
    }

    /**
     * Add friendly step in reporter
     * @param stepFunction function to add 
     * @returns Data returned by the function
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async addStep(stepDescription: string, stepFunction: any): Promise<any> {
        return await test.step(stepDescription, stepFunction);
    }

    /**
     * Add steps with annotations
     * @param type 
     * @param description 
     * @param stepFunction 
     * @returns 
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async addStepWithAnnotation(type: AnnotationType, description: string, stepFunction: () => Promise<any>) {
        if (this.isAnnotationEnabled) {
            this.addAnnotation(type, description);
            return await test.step(description, stepFunction);
        }
        else
            await stepFunction();
    }

    /**
     * Go to Default page
     */
    async goToDefault() {
        const stepDescription = 'Go to default page';
        this.addAnnotation(AnnotationType.GoTo, stepDescription);

        await test.step(stepDescription, async () => {
            await this.page.goto('/');
        });
    }

    /**
 * Init annotation to an empty array
 */
    initAnnotations() {
        this.annotationHelper.initAnnotations();
    }

    /**
 * Get current annotations
 * @returns Array of current annotations
 */
    getAnnotations() {
        return this.annotationHelper.getAnnotations();
    }

    /**
     * Press key in the page
     * @param key Key to press. Examples are: F1 - F12, Digit0- Digit9, KeyA- KeyZ, BackQuote, Minus, 
     * Equal, Backslash, Backspace, Tab, Delete, Escape, ArrowDown, End, Enter, Home, Insert, PageDown, 
     * PageUp, ArrowRight, ArrowUp, etc
     */
    async press(key: string) {
        await this.page.keyboard.press(key);
    }

    /**
     * Check that 2 values are equal
     * @param expected Value expected
     * @param actual Actual Value
     * @param assertMessage  Message to assert
     */
    public async AssertEqual(expected: string, actual: string, assertMessage: string) {
        await this.addStepWithAnnotation(AnnotationType.Assert, assertMessage, async () => {
            expect(expected, assertMessage).toEqual(actual);
        });
    }

    /**
     * Assert that 2 arrays are equal
     * @param expected Expected array
     * @param actual Actual array
     * @param assertMessage Assert message for the html reporter
     */
    public async AssertArrayEqual(expected: string[], actual: string[], assertMessage: string) {
        await this.addStepWithAnnotation(AnnotationType.Assert, assertMessage, async () => {
            expect(expected, assertMessage).toEqual(actual);
        });
    }
}