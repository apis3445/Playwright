import { Locator, Page } from '@playwright/test';
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
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, private name: string, byRole = true, isFirst = false) {
        let locator: Locator = page.getByRole('link', { name: name });
        if (!byRole)
            locator = page.locator(name);
        if (isFirst)
            locator = locator.first();
        super(page, annotationHelper, locator);
        this.text = this.name;
        this.label = this.name;
    }

    /**
     * Click in the link
     */
    async click() {
        const linkText = await this.getText();
        const stepDescription = `Click: "${linkText}"`;
        await this.addStepWithAnnotation(stepDescription, async () => {
            await this.locator.click();
        });
    }

    /**
     * Get the text of the link
     * @returns Link text content
     */
    override async getText(): Promise<string> {
        if (!this.label) {
            const linkText = await this.locator.textContent();
            if (linkText)
                this.label = linkText;
        }
        return this.label ?? '';
    }
}