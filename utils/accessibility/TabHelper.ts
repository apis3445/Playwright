/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable playwright/expect-expect */
import { Page, expect, test } from '@playwright/test';
import { AnnotationHelper } from '../annotations/AnnotationHelper';
import { AnnotationType } from '../annotations/AnnotationType';

/**
 * Check tab order
 */
export class TabHelper {
    private annotationHelper: AnnotationHelper = new AnnotationHelper(this.page, this.keyPage);
    private backgroundColor = '#0a50f5';
    private totalElements = 0;
    private links: any[] = [];
    private buttons: any[] = [];
    private checkBoxes: any[] = [];
    private comboBoxes: any[] = [];
    private listBoxes: any[] = [];
    private radios: any[] = [];
    private sliders: any[] = [];
    private currentTabs: any[] = [];
    private textBoxes: any[] = [];
    private tabElements: any[] = [];
    private inputTexts: any[] = [];
    private inputPasswords: any[] = [];

    constructor(protected page: Page, protected keyPage: string) {

    }

    /** Get elements in page */
    async getElementsInPage() {
        this.links = await this.page.locator('a:visible').all();
        this.buttons = await this.page.locator('button:visible').all();
        this.checkBoxes = await this.page.locator('input[type="checkbox"]:visible').all();
        this.comboBoxes = await this.page.locator('combobox:visible').all();
        this.listBoxes = await this.page.locator('listbox:visible').all();
        this.radios = await this.page.locator('input[type="radio"]:visible').all();
        this.inputPasswords = await this.page.locator('input[type="password"]:visible').all();
        this.sliders = await this.page.locator('slider:visible').all();
        this.textBoxes = await this.page.locator('textbox:visible').all();
        this.inputTexts = await this.page.locator('input[type="text"]:visible').all();
        this.tabElements = await this.page.locator('[tabindex]:not([tabindex="-1"]):not(a):not(button):not(checkbox):not(combobox):not(listbox):not(radio):not(slider):not(textbox)').all();
        this.totalElements = this.links.length + this.buttons.length + this.checkBoxes.length;
        this.totalElements += this.comboBoxes.length + this.listBoxes.length + this.radios.length;
        this.totalElements += this.inputTexts.length;
        this.totalElements += this.sliders.length + this.textBoxes.length + this.tabElements.length;
    }

    /** Show Tabs */
    async showTabOrder() {
        await test.step('Show Tabs', async () => {
            await this.annotationHelper.addDescriptionToFocusedElement((0).toString(), this.backgroundColor);
            await this.annotationHelper.addBorderFocusedElement(this.backgroundColor);
            await this.getElementsInPage();
            for (let i = 0; i < this.totalElements; i++) {
                await this.page.keyboard.press('Tab');
                const focused = this.page.locator('*:focus');
                // eslint-disable-next-line playwright/no-conditional-in-test
                if (await focused.isVisible()) {
                    this.currentTabs.push(focused);
                    await this.annotationHelper.addBorderFocusedElement(this.backgroundColor);
                }
                await this.annotationHelper.addDescriptionToFocusedElement((i + 1).toString(), this.backgroundColor);
            }
        });
    }

    /**
     * Check tab number should be the sum of links, buttons
     */
    async checkTabNumber() {
        const assertDescription = this.totalElements + ' elements must be accessible with Tab';
        this.annotationHelper.addAnnotation(AnnotationType.Assert, assertDescription);
        await expect.soft(this.currentTabs, assertDescription).toHaveLength(this.totalElements);
    }
}  