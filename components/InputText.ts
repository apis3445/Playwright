import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class InputText extends BaseComponent {

    /**
     * Constructor
     * @param page Page
     * @param annotationHelper Annotation that stores steps and custom annotations
     * @param name Name or locator for the text box
     * @param [byRole=true] 
     * True - To locate by role/name
     * False - To locate by css selector
     * Default is True
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
        this.label = await this.getLabel();
        const stepDescription = 'Fill "' + this.label + ':" with the value: "' + value + '"';
        await this.addStepWithAnnotation(stepDescription, async () => {
            await this.locator.fill(value);
        });
    }
}