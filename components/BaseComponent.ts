import { Locator, Page, test } from '@playwright/test';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class BaseComponent {

    type: string;
    locator: Locator;
    text: string;
    label: string;
    protected isAnnotationEnabled = true;
    protected isHighlightEnabled = false;

    constructor(protected page: Page, protected annotationHelper: AnnotationHelper) {
        this.type = this.constructor.name;
    }

    /**
     * Add annotation
     * @param description Description to add as annotation
     */
    addAnnotation(description: string) {
        if (this.isAnnotationEnabled)
            this.annotationHelper.addAnnotation(this.type.toString(), description);
    }

    /**
     * Add step and annotation
     * @param description Description to add as annotation
     * @param stepFunction Function to encapsulate as step
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async addStepWithAnnotation(description: string, stepFunction: () => Promise<any>) {
        if (this.isAnnotationEnabled) {
            await this.highlightStep(description);
            this.addAnnotation(description);
            return await test.step(description, stepFunction);
        }
        else
            await stepFunction();
    }

    /**
     * Encapsulate function as a step in html report
     * @param description Description to add as annotation
     * @param stepFunction Function to encapsulate as step
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async addStep(description: string, stepFunction: () => Promise<any>) {
        if (this.isAnnotationEnabled)
            return await test.step(description, stepFunction);
        else
            return await stepFunction();
    }

    /**
     * Disable annotations for the component
     */
    disableAnnotations() {
        this.isAnnotationEnabled = false;
    }

    /**
     * Highlight step for demo/debug
     * @param description step description
     */
    async highlightStep(description: string) {
        if (this.isHighlightEnabled) {
            await test.step('Highlight: ' + description, async () => {
                await this.locator.highlight();
                await this.page.evaluate(description => {
                    let debugElement = document.getElementById('playright-debug');
                    if (!debugElement) {
                        debugElement = document.createElement('div');
                        debugElement.id = 'playright-debug';
                        debugElement.style.backgroundColor = '#000';
                        debugElement.style.color = '#fff';
                        debugElement.style.position = 'fixed';
                        debugElement.style.left = '0';
                        debugElement.style.right = '0';
                        debugElement.style.bottom = '0';
                        debugElement.style.padding = '15px 30px';
                        debugElement.style.opacity = '0.8';
                        debugElement.style.zIndex = '1000';
                        document.body.appendChild(debugElement);
                    }
                    debugElement.innerHTML = description;
                }, description);
            });
        }
    }

    /**
     * Get place holder for the element
     * @returns Place holder 
     */
    public async getLabel() {
        return await this.addStep('Get label', async () => {
            if (!this.label) {
                const id = await this.locator.getAttribute('id');
                if (id) {
                    const labelElement = this.page.locator('label[for="' + id + '"]');
                    if (await labelElement.isVisible()) {
                        this.label = await labelElement.innerText();
                        if (this.label)
                            return this.label;
                        const placeHolderAttribute = await this.locator.getAttribute('placeholder');
                        if (placeHolderAttribute) {
                            this.label = placeHolderAttribute;
                            if (this.label)
                                return placeHolderAttribute;
                            const ariaLabelElement = await this.locator.getAttribute('aria-label');
                            if (ariaLabelElement) {
                                this.label = ariaLabelElement;
                                if (this.label)
                                    return ariaLabelElement;
                            }
                            return '';
                        }
                    }
                }
            }
        });
    }
}