import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Select extends BaseComponent {

    /**
     * Constructor
     * @param page Playwright page
     * @param annotationHelper Annotation helper
     * @param name Name for the combobox
     * @param byRole By default will search by role = combobox, if you set to false will search by css selector
     */
    constructor(page: Page, annotationHelper: AnnotationHelper, private name: string, byRole = true) {
        let locator: Locator = page.getByRole('combobox', { name: name });
        if (!byRole)
            locator = page.locator(name);
        super(page, annotationHelper, locator);
        this.text = this.name;
        this.label = name;
    }

    /**
     * Select an option in the combo by value
     * @param value Value to select
     */
    async selectOption(value: string) {
        await this.addStepWithAnnotation(`Select the option ${value}`, async () => {
            await this.locator.selectOption(value);
        });
    }

    /**
     * Select a random option in the combo except the options with includes some text
     * @param textToExclude Text to exclude options. Useful in e-commerce
     * when the out of stock is added to some size or colors
     */
    async selectRandomOptionWithoutText(textToExclude: string) {
        await this.addStepWithAnnotation('Select a random option', async () => {
            await this.locator.waitFor();
            const optionsLocator = await this.locator.locator('option').allInnerTexts();
            const cleanedOptions = optionsLocator.map(option => option.trim());
            // Filter out options that contain "out of stock"
            const availableOptions = cleanedOptions.filter(option =>
                !option.includes(textToExclude));
            if (availableOptions.length === 0) {
                throw new Error('No available options found');
            }
            const productIndex = Math.floor(Math.random() * availableOptions.length);
            // Select the first available option
            await this.selectOption(availableOptions[productIndex]);
        });
    }

    /**
     * Select a random option in the combo
     */
    async selectRandomOption() {
        await this.addStepWithAnnotation('Select a random option', async () => {
            const optionsLocator = await this.locator.locator('option').allInnerTexts();
            // Clean up the options by trimming whitespace
            const cleanedOptions = optionsLocator.map(option => option.trim());
            const productIndex = Math.floor(Math.random() * optionsLocator.length);
            // Select the first available option
            await this.selectOption(cleanedOptions[productIndex]);
        });
    }
}