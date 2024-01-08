import { Page, test, expect } from '@playwright/test';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import { AnnotationHelper } from '../../utils/annotations/AnnotationHelper';

export class BasePage {

    public stepDescription: string;
    protected isAnnotationEnabled = true;
    protected annotationHelper = new AnnotationHelper(this.page, this.keyPage);
    public BASE_URL = process.env.BASE_URL!;

    constructor(protected readonly page: Page, public readonly keyPage) {

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
    async addStep(stepDescription: string, stepFunction): Promise<any> {
        return await test.step(stepDescription, stepFunction);
    }

    /**
     * Add steps with annotations
     * @param type 
     * @param description 
     * @param stepFunction 
     * @returns 
     */
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
        // eslint-disable-next-line playwright/expect-expect
        await test.step(stepDescription, async () => {
            await this.page.goto('/');
            await this.page.waitForLoadState('networkidle');
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

    public AssertEqual(expected: string, actual: string, errorMessage: string) {
        this.annotationHelper.addAnnotation(AnnotationType.Assert, errorMessage);
        expect(expected, errorMessage).toEqual(actual);
    }
}