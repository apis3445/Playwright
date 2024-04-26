import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class InputPassword extends BaseComponent {

    /**
     * Constructor
     * @param page Playwright page
     * @param annotationHelper annotation helper
     * @param name Name or css locator for the link
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
     * Fill the password
     * @param value Password to fill
     */
    async fill(value: string) {
        this.label = await this.getInputLabel();
        const stepDescription = 'Fill: "' + this.label + ' with value: *****"';
        await this.addStepWithAnnotation(stepDescription, async () => {
            await this.locator.fill(value);
        });
    }

}