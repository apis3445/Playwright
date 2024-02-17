import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Heading extends BaseComponent {

    /**
     * Constructor
     * @param page Playwright page 
     * @param annotationHelper Annotation that stores steps and custom annotations
     * @param name Name for the button
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, private name: string, byRole = true) {
        super(page, annotationHelper);
        this.text = this.name;
        if (byRole)
            this.locator = this.page.getByRole('heading', { name: name });
        else
            this.locator = this.page.locator(this.name);
    }

}