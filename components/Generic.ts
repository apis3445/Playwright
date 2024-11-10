import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Generic extends BaseComponent {
    /**
     * Constructor
     * @param page Playwright page 
     * @param annotationHelper Annotation that stores steps and custom annotations
     * @param name Name for the button
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, public selector: string, public name: string) {
        const locator = page.locator(selector);
        super(page, annotationHelper, locator);
        this.label = name;
    }

}