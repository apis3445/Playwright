import { Locator, Page, TestInfo, test } from '@playwright/test';
import { AnnotationType } from './AnnotationType';
import { Annotation } from './Annotation';
import fs from 'fs';
import path from 'path';

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

    async addDescription(stepDescription: string, backgroundColor: string) {
        await this.page.evaluate(
            ([description, backgroundColor]) => {
                const descriptionElementId = 'playwright-footer';
                let footerElement = document.getElementById(descriptionElementId);
                if (!footerElement) {
                    footerElement = document.createElement('div');
                    footerElement.style.backgroundColor = backgroundColor;
                    footerElement.style.color = '#fff';
                    footerElement.style.position = 'fixed';
                    footerElement.style.left = '0';
                    footerElement.style.right = '0';
                    footerElement.style.bottom = '0';
                    footerElement.style.padding = '10px';
                    footerElement.style.zIndex = '1000';
                    footerElement.style.fontSize = '14px';
                    footerElement.style.overflowY = 'auto';
                    footerElement.style.maxHeight = '150px';
                    footerElement.style.opacity = '0.8';
                    document.body.appendChild(footerElement);
                }
                footerElement.innerHTML = description;
            }, [stepDescription, backgroundColor]);
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
