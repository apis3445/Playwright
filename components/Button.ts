import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Button extends BaseComponent {

    /**
     * Constructor
     * @param page Playwright page 
     * @param annotationHelper Annotation that stores steps and custom annotations
     * @param name Name for the button
     * @param byRole default to true. Allows to search byRole "button" instead of css selector
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, private name: string, byRole = true) {
        let locator: Locator = page.getByRole('button', { name: name });
        if (!byRole)
            locator = page.locator(name);
        super(page, annotationHelper, locator);
        if (byRole)
            this.label = name;
    }

    /**
     * Click in a button
     */
    async click() {
        const stepDescription = `Click: "${await this.getButtonText()}"`;
        await this.addStepWithAnnotation(stepDescription, async () => {
            await this.locator.click();
        });
    }

    async IsVisible(): Promise<boolean> {
        return await this.addStepWithAnnotation('Check if the button is visible', async () => {
            return this.locator.isVisible();
        });
    }

}