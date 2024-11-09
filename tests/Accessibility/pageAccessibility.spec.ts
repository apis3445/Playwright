
import { Page, test } from '@playwright/test';
import { AnnotationHelper } from '../../utils/annotations/AnnotationHelper';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import playwright from 'playwright';
import { AccessibilityHelper } from '../../utils/accessibility/AccessibilityHelper';
import * as allure from 'allure-js-commons';

test.describe('Test Accessibility By Page', {
    tag: ['@PageAccessibility'],
}, () => {
    // All tests in this describe group will get 0 retry attempts
    test.describe.configure({ retries: 0 });

    let page: Page;

    // eslint-disable-next-line playwright/expect-expect
    test('Check Page accessibility', async ({ browserName }, testInfo) => {
        await allure.feature('Accessibility');
        await allure.suite('Custom Page');
        // eslint-disable-next-line playwright/no-skipped-test
        test.skip(browserName !== 'chromium', 'Lighthouse only works in chrome');
        //You can test any page in environment variable
        const pageToTest = process.env.PAGE_URL!;
        const browser = await playwright['chromium'].launch({
            args: ['--remote-debugging-port=9222'],
        });
        const context = await browser.newContext({
            recordVideo: {
                dir: testInfo.outputPath('videos')
            },

        });
        //With manual context or page is needed to setup the video
        page = await context.newPage();
        const annotationHelper = new AnnotationHelper(page, pageToTest);
        annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to: ' + pageToTest);
        await page.goto(pageToTest);
        const accessibilityHelper = new AccessibilityHelper(page, testInfo, annotationHelper);
        await accessibilityHelper.checkAccessibility(pageToTest, page);
    });

    test.afterAll(async ({ }, testInfo) => {
        const videoPath = testInfo.outputPath('allyVideo.webm');
        await Promise.all([
            page.video()?.saveAs(videoPath),
            page.close()
        ]);
        testInfo.attachments.push({
            name: 'video',
            path: videoPath,
            contentType: 'video/webm'
        });
    });

});