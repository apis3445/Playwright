import { Locator, Page, TestInfo, test } from '@playwright/test';
import { AnnotationType } from './AnnotationType';
import { Annotation } from './Annotation';
import fs from 'fs';
import path from 'path';
import { ImpactType } from '../accessibility/models/ImpactType';

export class AnnotationHelper {

    private debugElement = 'playwright-debug';
    private annotations: Annotation[] = [];
    private resultsFolder = 'test-results';

    constructor(protected page: Page, protected keyPage: string) {

    }

    /**
     * Empty annotations array
     */
    public initAnnotations() {
        this.annotations = [];
    }

    async addDescription(stepDescription: string, backgroundColor: ImpactType = ImpactType.noImpact) {
        const debugElementId = 'playright-debug';
        await this.page.evaluate(([description, debugElementId, backgroundColor]) => {
            let debugElement = document.getElementById(debugElementId);
            if (!debugElement) {
                debugElement = document.createElement('div');
                debugElement.id = debugElementId;
                debugElement.style.backgroundColor = backgroundColor;
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
        }, [stepDescription, debugElementId, backgroundColor]);
    }

    /**
     * Add error description at the bottom
     * @param locator locator to highlight
     * @param description Description of the error
     * @param backgroundColor Background color
     */
    async addErrorDescription(locator: Locator, description: string, backgroundColor: ImpactType) {
        await test.step('Add Description', async () => {
            const element = locator.first();
            // eslint-disable-next-line playwright/no-conditional-in-test
            if (await element.isVisible()) {
                await element.focus();
                await this.addBorderFocusedElement(backgroundColor);
            }
            await this.addDescription(description, backgroundColor);
        });
    }

    /**
     * Add border to focused element
     * @param borderColor Border color
     */
    async addBorderFocusedElement(borderColor: string) {
        const params = {
            borderColor: borderColor
        };
        await this.page.evaluate(params => {
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement) {
                activeElement['style'].border = '2px solid ' + params.borderColor;
            }
        }, params);
    }

    /**
     * Add description to focused element
     * @param description description to add
     * @param backgroundColor background color
     */
    async addDescriptionToFocusedElement(description: string, backgroundColor: string) {
        // eslint-disable-next-line playwright/expect-expect
        await test.step('Add Description', async () => {
            const params = {
                description: description,
                backgroundColor: backgroundColor,
                elementId: 'tab' + description
            };
            await this.page.evaluate(params => {
                const activeElement = document.activeElement as HTMLElement;
                let debugElement = document.getElementById(params.elementId);
                debugElement = document.createElement('div');
                debugElement.id = params.elementId;
                debugElement.style.top = `${activeElement.offsetTop}px`;
                debugElement.style.left = `${activeElement.offsetLeft}px`;
                debugElement.style.color = '#fff';
                debugElement.style.fontSize = '16px';
                debugElement.style.fontWeight = 'bold';
                debugElement.style.position = 'absolute';
                debugElement.style.width = '30px';
                debugElement.style.textAlign = 'center';
                debugElement.style.opacity = '0.8';
                debugElement.style.zIndex = '3000';
                debugElement.style.width = '20px';
                debugElement.style.pointerEvents = 'none';
                debugElement.style.backgroundColor = params.backgroundColor;
                debugElement.innerHTML = params.description;
                activeElement?.parentNode?.appendChild(debugElement);
            }, params);
        });
    }

    /**
     * Remove Description
     */
    async removeDescription() {
        const params = {
            debugElement: this.debugElement
        };
        await this.page.evaluate(params => {
            const debugElement = document.getElementById(params.debugElement);
            if (debugElement)
                debugElement.remove();
        }, params);
    }

    /**
     * Add annotation
     * @param type Type of the annotation (shows in bold)
     * @param description Description for the annotation
     */
    addAnnotation(type: AnnotationType | string, description: string) {
        const annotation: Annotation = {
            type: type.toString(),
            description: description,
            keyPage: this.keyPage
        };
        this.annotations.push(annotation);
        test.info().annotations.push({ type: type.toString(), description: description });
    }

    /**
     * Get list of annotations
     * @returns List of annotations
     */
    getAnnotations() {
        return this.annotations;
    }

    /**
     * Attach Page screenshot
     * @param fileName Screenshot filename
     * @param testInfo 
     */
    async attachPageScreenshot(fileName: string, testInfo: TestInfo) {
        // eslint-disable-next-line playwright/expect-expect
        await test.step('Add Page screenshot', async () => {
            const file = path.join(this.resultsFolder, fileName);
            const screenshot = await this.page.screenshot({ path: file, fullPage: true });
            await fs.promises.writeFile(file, screenshot);
            await testInfo.attach(fileName, { contentType: 'image/png', path: file });
        });
    }

    /**
     * Attach locator screenshot in report
     * @param targetLocator target locator to take screenshot
     * @param fileName filename for the image 
     * @param testInfo testInfo to attach files
     * @returns 
     */
    async attachScreenshot(targetLocator: Locator, fileName: string, testInfo: TestInfo) {
        if (!await targetLocator.isVisible())
            return;
        const file = path.join(this.resultsFolder, fileName);
        const pathFile = path.dirname(file);
        const pathAttachments = path.join(pathFile, 'attachments');
        const attachmentFile = path.join(pathAttachments, fileName);
        const screenshot = await targetLocator.screenshot({ path: file });
        await fs.promises.writeFile(file, screenshot);
        if (!fs.existsSync(pathAttachments))
            fs.mkdirSync(pathAttachments, { recursive: true });
        await fs.promises.writeFile(attachmentFile, screenshot);
        await testInfo.attach(fileName, { contentType: 'image/png', path: file });
    }

    /**
     * Add screenshot
     * @param targetLocator 
     * @param fileName 
     * @param testInfo 
     * @returns 
     */
    async addScreenshot(targetLocator: Locator, fileName: string, testInfo: TestInfo) {
        if (!await targetLocator.isVisible())
            return;
        const file = path.join(this.resultsFolder, fileName);
        const pathFile = path.dirname(file);
        const pathAttachments = path.join(pathFile, 'attachments');
        const attachmentFile = path.join(pathAttachments, fileName);
        const screenshot = await targetLocator.screenshot({ path: attachmentFile });
        if (!fs.existsSync(pathAttachments))
            fs.mkdirSync(pathAttachments, { recursive: true });
        await fs.promises.writeFile(attachmentFile, screenshot);
        await testInfo.attach(fileName, { contentType: 'image/png', path: attachmentFile });
    }
}
