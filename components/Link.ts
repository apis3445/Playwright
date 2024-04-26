import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Link extends BaseComponent {

    /**
     * Constructor
     * @param page Page
     * @param annotationHelper Annotation that stores steps and custom annotations
     * @param name Name or css locator for the link
     * @param [byRole=true] 
     * True - To locate by role/name
     * False - To locate by css selector
     * Default is True
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, private name: string, byRole = true, isFirst = false) {
        super(page, annotationHelper);
        if (byRole) {
            this.locator = this.page.getByRole('link', { name: this.name });
            if (isFirst)
                this.locator = this.locator.first();
            this.text = this.name;
            this.label = this.name;
        }
        else {
            this.locator = this.page.locator(this.name);
            if (isFirst)
                this.locator = this.locator.first();
        }
    }

    /**
     * Click in the link
     */
    async click() {
        const linkText = await this.getText();
        const stepDescription = 'Click: "' + linkText + '"';
        await this.addStepWithAnnotation(stepDescription, async () => {
            await this.locator.click();
        });
    }

    async getText() {
        if (!this.label) {
            const linkText = await this.locator.textContent();
            if (linkText)
                this.label = linkText;
        }
        return this.label;
    }

}