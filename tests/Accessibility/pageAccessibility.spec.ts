/* eslint-disable playwright/expect-expect */
import { test } from '@playwright/test';
import { AccessibilityHelper } from '../../utils/accessibility/AccessibilityHelper';
import { AltHelper } from '../../utils/accessibility/AltHelper';
import { TabHelper } from '../../utils/accessibility/TabHelper';
import { AnnotationHelper } from '../../utils/annotations/AnnotationHelper';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

test.describe('Test Accessibility By Page', () => {
    // All tests in this describe group will get 0 retry attempts
    test.describe.configure({ retries: 0 });

    /**
    * This example demonstrates how to test an entire page for automatically detectable accessibility violations. 
    * @see https://playwright.dev/docs/accessibility-testing
    */
    test('Check Page accessibility', async ({ page }, testInfo) => {
        //You can test any page in environment variable
        const pageToTest = process.env.PAGE_URL!;
        const accessibilityHelper = new AccessibilityHelper(page, testInfo);
        const annotationHelper = new AnnotationHelper(page, pageToTest);
        annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to: ' + pageToTest);
        await page.goto(pageToTest);
        await accessibilityHelper.checkAccessibility('CustomPage', annotationHelper.getAnnotations());

    });

    test('Check tab order', async ({ page }, testInfo) => {
        const pageToTest = process.env.PAGE_URL!;
        const keyPage = 'CustomPage';
        const annotationHelper = new AnnotationHelper(page, keyPage);
        const tabHelper = new TabHelper(page, keyPage);
        annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to: ' + pageToTest);
        await page.goto(pageToTest);
        //Add a number and blue box to the element after press tab
        await tabHelper.showTabOrder();
        //Check that the tab is the same that the elements
        await tabHelper.checkTabNumber();
        await annotationHelper.attachPageScreenshot('tab.png', testInfo);
    });

    test('Check alt text & aria-label', async ({ page }, testInfo) => {
        const pageToTest = process.env.PAGE_URL!;
        const keyPage = 'CustomPage';
        const annotationHelper = new AnnotationHelper(page, keyPage);
        const altHelper = new AltHelper(page, keyPage, testInfo);
        annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to: ' + pageToTest);
        await page.goto(pageToTest);
        //Check that images have alt text attribute
        await altHelper.checkAltText();
        //Generate a table with all alt texts
        await altHelper.generateSummaryPage();
    });

});