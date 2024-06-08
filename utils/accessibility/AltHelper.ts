import { Locator, Page, TestInfo, expect } from '@playwright/test';
import { AnnotationHelper } from '../annotations/AnnotationHelper';
import { AnnotationType } from '../annotations/AnnotationType';
import { Alt } from './models/Alt';
import fs from 'fs';
import path from 'path';
import mustache from 'mustache';

export class AltHelper {

    private annotationHelper: AnnotationHelper = new AnnotationHelper(this.page, this.keyPage);
    private imageLocators: Locator[];
    private folderResults = 'test-results/';
    private alts: Alt[] = [];

    constructor(protected page: Page, protected keyPage: string, protected testInfo: TestInfo) {
        this.imageLocators = [];

    }

    /** Get images in page */
    async getImagesInPage() {
        this.imageLocators = await this.page.getByRole('img').all();
    }

    /**
     * Check alternate text
     */
    async checkAltText() {
        this.annotationHelper.addAnnotation(AnnotationType.Assert, 'Check alt text in images');
        await this.getImagesInPage();
        let index = 0;
        for (const imageLocator of this.imageLocators) {
            const altText = await imageLocator.getAttribute('alt');
            const ariaLabel = await imageLocator.getAttribute('aria-label');
            const fileName = index + '.png';
            await this.annotationHelper.attachScreenshot(imageLocator, fileName, this.testInfo);
            const alt: Alt = {
                imageNumber: ++index,
                screenshot: fileName,
                target: imageLocator.toString().split('internal:')[1],
                altText: altText ?? 'No alt text',
                ariaLabel: ariaLabel ?? 'No aria-label'
            };
            this.alts.push(alt);
            expect.soft(altText ?? ariaLabel, 'Expect all images have alt text or aria-label').not.toBeNull();
        }
    }

    /**
     * Generate summary alt images
     */
    async generateSummaryPage() {
        if (this.alts.length == 0)
            return;
        const altFile = 'altPage.html';
        const altPageFilePath = this.folderResults + altFile;
        const altTemplate = fs.readFileSync(path.resolve(__dirname, 'templates', altFile), {
            encoding: 'utf8',
        });
        const htmlAltContent = mustache.render(altTemplate,
            {
                altImages: this.alts,
                page: this.keyPage
            });
        fs.writeFileSync(altPageFilePath, htmlAltContent);
        await this.testInfo.attach('AltImages', { path: altPageFilePath });
    }
}