import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Password extends BaseComponent {

    /**
     * Constructor
     * @param page Playwright page
     * @param annotationHelper annotation helper
     * @param placeholder placeholder
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
        this.placeHolder = await this.getPlaceHolder();
        const stepDescription = 'Fill: "' + this.placeHolder + ' with value: *****"';
        await this.addStepWithAnnotation(stepDescription, async () => {
            await this.locator.fill(value);
        });
    }

}