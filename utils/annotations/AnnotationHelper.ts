
import { Locator, Page, TestInfo, test } from '@playwright/test';
import { AnnotationType } from './AnnotationType';
import { Annotation } from './Annotation';
import fs from 'fs';
import path from 'path';

export class AnnotationHelper {

    private debugElement = 'playwright-debug';
    private annotations: Annotation[] = [];
    private resultsFolder = 'test-results';
    private mediaRecorder: unknown;
    private recordedChunks: Blob[] = [];

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
                const descriptionElementId = 'playwright-description';
                let descriptionElement = document.getElementById(descriptionElementId);
                if (!descriptionElement) {
                    descriptionElement = document.createElement('div');
                    descriptionElement.id = descriptionElementId;
                    document.body.appendChild(descriptionElement);
                }
                descriptionElement.style.cssText = `
                        background-color: ${backgroundColor};
                        color: #fff;
                        position: fixed;
                        left: 0;
                        right: 0;
                        top: 0;
                        padding: 10px;
                        z-index: 1000;
                        font-size: 18px;
                        overflow-y: auto;
                        max-height: 150px;
                        opacity: 0.9;
                        font-weight: bold;
                    `;
                descriptionElement.innerText = description;

            }, [stepDescription, backgroundColor]);
    }

    async readDescription(stepDescription: string) {
        await this.page.evaluate(
            async (stepDescription) => {
                if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(stepDescription);
                    utterance.lang = 'en-US';

                    window.speechSynthesis.speak(utterance);

                    const wordsPerMinute = 105;
                    const words = stepDescription.split(/\s+/).length;
                    const durationInSeconds = (words / wordsPerMinute) * 60;

                    await new Promise(resolve => setTimeout(resolve, durationInSeconds * 1000));

                } else {
                    console.error('Speech synthesis or media recording not supported in this browser.');
                    return null;
                }
            }, stepDescription);
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

        return await test.step('Add Page screenshot', async () => {
            const file = path.join(this.resultsFolder, fileName);
            const screenshot = await this.page.screenshot({ path: file, fullPage: true });
            await fs.promises.writeFile(file, screenshot);
            await testInfo.attach(fileName, { contentType: 'image/png', path: file });
            return screenshot;
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

    /** Add a border to the specified element with the given border color.
    * @param element The CSS selector of the element to which the border will be added
    * @param borderColor The color of the border to be applied
    */
    async addBorderToElement(element: string, borderColor: string) {
        await this.page.evaluate(([element, borderColor]) => {
            const el = document.querySelector(element) as HTMLElement;
            if (el) {
                el.style.border = `2px solid ${borderColor}`;
            }
        }, [element, borderColor]);
    }

    /**
     * Add a border to the specified element with the given border color.
     * @param element The CSS selector of the element to which the border will be added
     * @param borderColor The color of the border to be applied
     */
    async removeBorder(element: string) {
        await this.page.evaluate(([element]) => {
            const el = document.querySelector(element) as HTMLElement;
            if (el) {
                el.style.border = '';
            }
        }, [element]);
    }
}
