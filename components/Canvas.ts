import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

/**
 * Canvas component representing a specific element on the page.
 */
export class Canvas extends BaseComponent {

    /**
     * Constructor
     * @param page Playwright page 
     * @param annotationHelper Annotation that stores steps and custom annotations
     * @param selector selector for the canvas element
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, public selector: string) {
        const locator = page.locator(selector);
        super(page, annotationHelper, locator);
        this.text = this.selector;
    }
}