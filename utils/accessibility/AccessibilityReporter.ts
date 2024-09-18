import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { ReportData } from './models/Report';
import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import { A11yError } from './models/A11yError';
import { FileHelper } from '../FileHelper';

class AccessibilityReporter implements Reporter {
    private testNo = 0;
    private folderResults = 'steps-report';
    private fileHelper: FileHelper = new FileHelper();

    async onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}`);

        this.testNo++;
        const folderTest = path.join(this.folderResults, this.testNo.toString());
        const fileName = `a11y${this.testNo}.html`;
        const filePath = path.join(folderTest, fileName);

        // Extract and handle reportData from annotations
        const reportDataAnnotation = test.annotations.find(annotation => annotation.type === 'A11y');
        if (reportDataAnnotation) {
            const reportData: ReportData = JSON.parse(reportDataAnnotation.description!);
            const copiedVideoPath = this.fileHelper.copyVideo(result, folderTest);
            reportData.video = copiedVideoPath;

            const templatePath = path.join(__dirname, 'templates', 'byPage.html');
            const template = fs.readFileSync(templatePath, 'utf-8');
            const htmlContent = mustache.render(template, { data: reportData });
            if (!fs.existsSync(folderTest)) {
                fs.mkdirSync(folderTest, { recursive: true });
            }
            fs.writeFileSync(filePath, htmlContent);

            // Copy screenshots to folderTest path
            reportData.errors.forEach((error: A11yError) => {
                error.target.forEach(target => {
                    const sourcePath = target.screenshot;
                    const destinationPath = path.join(folderTest, path.basename(sourcePath));
                    fs.copyFileSync(sourcePath, destinationPath);
                    // Update the screenshot path in the report data
                    target.screenshot = path.basename(sourcePath);
                });
            });
        }
    }
}

export default AccessibilityReporter;