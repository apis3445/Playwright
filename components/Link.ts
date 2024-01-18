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
    constructor(page: Page, annotationHelper: AnnotationHelper, private name: string, byRole = true) {
        super(page, annotationHelper);
        if (byRole) {
            this.locator = this.page.getByRole('link', { name: this.name });
            this.text = this.name;
        }
        else {
            this.locator = this.page.locator(this.name);
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

    /**
     * Get the text of the link
     * @returns link text
     */
    async getText() {
        this.placeHolder = await this.getPlaceHolder();
        const stepDescription = 'Get text for: "' + this.placeHolder + '"';
        return await this.addStep(stepDescription, async () => {
            const textContent = await this.locator.textContent();
            this.text = textContent ?? this.type;
            return this.text;
        });
    }
}