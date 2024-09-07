import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { ReportData } from './models/Report';
import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import { A11yError } from './models/A11yError';

class AccessibilityReporter implements Reporter {
    private testNo = 0;
    private folderResults = 'steps-report';

    async onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}`);

        this.testNo++;
        const folderTest = path.join(this.folderResults, this.testNo.toString());
        const fileName = 'a11y.html';
        const filePath = path.join(folderTest, fileName);

        // Extract and handle reportData from annotations
        const reportDataAnnotation = test.annotations.find(annotation => annotation.type === 'A11y');
        if (reportDataAnnotation) {
            const reportData: ReportData = JSON.parse(reportDataAnnotation.description!);
            const videoPath = result.attachments.find(attachment => attachment.name === 'video')?.path;
            if (videoPath) {
                const videoFileName = path.basename(videoPath);
                const destination = path.join(folderTest, videoFileName);
                if (!fs.existsSync(destination)) {
                    fs.mkdirSync(destination, { recursive: true });
                }
                fs.copyFileSync(videoPath, destination);
                reportData.video = destination;
            }
            const templatePath = path.join(__dirname, 'templates', 'byPage.html');
            const template = fs.readFileSync(templatePath, 'utf-8');
            const htmlContent = mustache.render(template, { data: reportData });
            const pathSteps = path.dirname(filePath);
            if (!fs.existsSync(pathSteps)) {
                fs.mkdirSync(pathSteps, { recursive: true });
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

    private copyFileToResults(srcPath: string, destFolder: string) {
        const fileName = path.basename(srcPath);
        const destDir = path.resolve(__dirname, '..', '..', destFolder);
        const destFile = path.join(destDir, fileName);

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        fs.copyFileSync(srcPath, destFile);
        return fileName;
    }


}

export default AccessibilityReporter;