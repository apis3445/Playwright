import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Canvas extends BaseComponent {

    /**
     * Constructor
     * @param page Playwright page 
     * @param annotationHelper Annotation that stores steps and custom annotations
     * @param name Name for the button
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, public name: string) {
        super(page, annotationHelper);
        this.text = this.name;
        this.locator = this.page.locator(name);
    }

}