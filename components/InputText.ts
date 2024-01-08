import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class InputText extends BaseComponent {

    /**
     * Constructor
     * @param page Page
     * @param annotationHelper annotation help that stores steps and custom annotations
     * @param placeholder placeholder for the input
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, private name: string, byRole = true) {
        super(page, annotationHelper);
        if (byRole)
            this.locator = this.page.getByRole('textbox', { name: name });
        else
            this.locator = this.page.locator(this.name);
    }

    /**
     * Fill the value for the input text
     * @param value Value to fill
     */
    async fill(value: string) {
        this.placeHolder = await this.getPlaceHolder();
        const stepDescription = 'Fill: "' + this.placeHolder + '" with value: "' + value + '"';
        await this.addStepWithAnnotation(stepDescription, async () => {
            await this.locator.fill(value);
        });
    }
}