import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import { AnnotationType } from '../annotations/AnnotationType';
import { TestStatusIcon } from './models/TestStatusIcon';
import { TestResults } from './models/TestResults';

class StepReporter implements Reporter {
    private testNo = 0;
    private folderResults = 'test-results/';

    // Helper function to strip ANSI escape codes
    private stripAnsiCodes(text: string): string {
        // eslint-disable-next-line no-control-regex
        const strippedText = text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
        return strippedText;
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const results: TestResults[] = [];

        this.testNo++;
        const fileName = `test_${this.testNo}.html`;
        const filePath = path.join(this.folderResults, fileName);

        const tags = test.tags.map(tag => tag.replace('@', '')) ?? [];
        // Map the result status to the corresponding icon
        const statusIcon = TestStatusIcon[result.status as keyof typeof TestStatusIcon];
        const steps = test.annotations.filter(annotation =>
            annotation.type != AnnotationType.Precondition
            && annotation.type != AnnotationType.PostCondition
            && annotation.type != AnnotationType.Description)
            .map(annotation => annotation.description ?? 'No description');
        //Get the pre conditions
        const preConditions = test.annotations.filter(annotation => annotation.type == AnnotationType.Precondition)
            .map(annotation => annotation.description ?? 'No pre conditions');
        //Get the post conditions
        const postConditions = test.annotations.filter(annotation => annotation.type == AnnotationType.PostCondition)
            .map(annotation => annotation.description ?? 'No post conditions');
        //Get the description
        const descriptionAnnotation = test.annotations.find(annotation => annotation.type == AnnotationType.Description);
        const description = descriptionAnnotation?.description ?? 'No Description';
        const browser = test.parent.project()?.name ?? 'No browser';

        // Capture video and screenshot paths
        const videoPath = result.attachments.find(attachment => attachment.name === 'video')?.path;
        const screenshotPaths: string[] = result.attachments
            .filter(attachment => attachment.name === 'screenshot')
            .map(attachment => attachment.path ?? '') ?? [];
        const attachments: string[] = result.attachments
            .filter(attachment => attachment.name !== 'screenshot' && attachment.name !== 'video')
            .map(attachment => attachment.path ?? '') ?? [];
        // Capture errors
        const errors = result.errors.map(error => this.stripAnsiCodes(error.message ?? 'No errors')) ?? [];

        results.push({
            title: test.title,
            description: description,
            status: result.status,
            browser: browser,
            tags: tags,
            preConditions: preConditions,
            steps: steps,
            postConditions: postConditions,
            statusIcon: statusIcon,
            videoPath: videoPath,
            screenshotPaths: screenshotPaths,
            attachments: attachments,
            errors: errors
        });
        const templatePath = path.join(__dirname, 'templates', 'stepReporter.html');
        const template = fs.readFileSync(templatePath, 'utf-8');
        const htmlContent = mustache.render(template, { results: results });
        const pathSteps = path.dirname(filePath);
        if (!fs.existsSync(pathSteps)) {
            fs.mkdirSync(pathSteps, { recursive: true });
        }
        fs.writeFileSync(filePath, htmlContent);
    }

}

export default StepReporter;