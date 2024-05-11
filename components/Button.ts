import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Button extends BaseComponent {

    /**
     * Constructor
     * @param page Playwright page 
     * @param annotationHelper Annotation that stores steps and custom annotations
     * @param name Name for the button
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, private name: string) {
        super(page, annotationHelper);
        this.text = this.name;
        this.locator = this.page.getByRole('button', { name: name });
        this.label = name;
    }

    /**
     * Click in a button
     */
    async click() {
        const stepDescription = 'Click: "' + await this.getText() + '"';
        await this.addStepWithAnnotation(stepDescription, async () => {
            await this.locator.click();
        });
    }

}