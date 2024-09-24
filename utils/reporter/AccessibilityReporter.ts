import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { ReportData } from '../accessibility/models/Report';
import { FileHelper } from '../FileHelper';
import { HtmlHelper } from '../HtmlHelper';
import path from 'path';

class AccessibilityReporter implements Reporter {
    private testNo = 0;
    private folderResults = 'steps-report';
    private fileHelper: FileHelper = new FileHelper();
    private htmlHelper: HtmlHelper = new HtmlHelper();

    async onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}`);

        this.testNo++;
        const folderTest = path.join(this.folderResults, this.testNo.toString());
        const fileName = `a11y${this.testNo}.html`;
        const filePath = path.join(folderTest, fileName);

        // Extract and handle reportData from annotations
        const reportDataAnnotation = test.annotations.find(annotation => annotation.type === 'A11y');
        if (reportDataAnnotation) {
            const reportData: ReportData = JSON.parse(reportDataAnnotation.description ?? '{}');
            this.fileHelper.copyVideo(result, folderTest);
            this.fileHelper.copyScreenshots(result, folderTest);
            this.fileHelper.copyImages(result, folderTest);
            await this.htmlHelper.replaceTags('byPage.html', { data: reportData, folderTest }, folderTest, filePath);
        }
    }
}

export default AccessibilityReporter;