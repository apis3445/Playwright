import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import { AnnotationType } from '../annotations/AnnotationType';
import { TestStatusIcon } from './models/TestStatusIcon';
import { TestResults } from './models/TestResults';

class StepReporter implements Reporter {
    private testNo = 0;
    private folderResults = 'steps-report/';

    // Helper function to strip ANSI escape codes
    // Helper function to map ANSI escape codes to HTML styles
    private ansiToHtml(text: string): string {
        const ansiToHtmlMap: Record<string, string> = {
            '\u001b[30m': '<span class="black">',
            '\u001b[31m': '<span class="red">',
            '\u001b[32m': '<span class="green">',
            '\u001b[33m': '<span class="yellow">',
            '\u001b[34m': '<span class="blue">',
            '\u001b[35m': '<span class="magenta">',
            '\u001b[36m': '<span class="cyan">',
            '\u001b[37m': '<span class="white">',
            '\u001b[0m': '</span>', // Reset
            '\u001b[2m': '<span class="dim">', // Dim
            '\u001b[22m': '</span>', // Reset dim
            '\u001b[39m': '</span>', // Reset color
            // Add more mappings as needed
        };

        let htmlText = text;
        const openTags: string[] = [];

        for (const [ansiCode, htmlTag] of Object.entries(ansiToHtmlMap)) {
            if (htmlTag.startsWith('<span')) {
                openTags.push(htmlTag);
            } else if (htmlTag === '</span>') {
                if (openTags.length > 0) {
                    openTags.pop();
                } else {
                    // If there is no matching opening tag, skip this closing tag
                    continue;
                }
            }
            htmlText = htmlText.split(ansiCode).join(htmlTag);
        }

        // Close any remaining open tags
        while (openTags.length > 0) {
            htmlText += '</span>';
            openTags.pop();
        }
        return htmlText;
    }

    // Helper function to copy files
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

    onTestEnd(test: TestCase, result: TestResult) {
        const results: TestResults[] = [];

        this.testNo++;
        const folderTest = this.folderResults + this.testNo;
        const fileName = 'index.html';
        const filePath = path.join(folderTest, fileName);

        const tags = test.tags.map(tag => tag.replace('@', '')) ?? [];
        const statusIcon = TestStatusIcon[result.status as keyof typeof TestStatusIcon];
        const steps = test.annotations.filter(annotation =>
            annotation.type != AnnotationType.Precondition
            && annotation.type != AnnotationType.PostCondition
            && annotation.type != AnnotationType.Description
            && annotation.type != 'A11y')
            .map(annotation => annotation.description ?? 'No steps');
        const preConditions = test.annotations.filter(annotation => annotation.type == AnnotationType.Precondition)
            .map(annotation => annotation.description ?? 'No pre conditions');
        const postConditions = test.annotations.filter(annotation => annotation.type == AnnotationType.PostCondition)
            .map(annotation => annotation.description ?? 'No post conditions');
        const descriptionAnnotation = test.annotations.find(annotation => annotation.type == AnnotationType.Description);
        const description = descriptionAnnotation?.description ?? 'No Description';
        const browser = test.parent.project()?.name ?? 'No browser';

        // Capture video and screenshot paths
        const videoPath = result.attachments.find(attachment => attachment.name === 'video')?.path;
        const screenshotPaths: string[] = result.attachments
            .filter(attachment => attachment.name === 'screenshot')
            .map(attachment => attachment.path ?? '') ?? [];
        const attachments: { path: string, name: string }[] = result.attachments
            .filter(attachment => attachment.name !== 'screenshot' && attachment.name !== 'video')
            .map(attachment => ({ path: attachment.path ?? '', name: attachment.name ?? '' })) ?? [];

        // Copy video and screenshot files to folderResults
        const copiedVideoPath = videoPath ? this.copyFileToResults(videoPath, folderTest) : undefined;
        const copiedScreenshotPaths = screenshotPaths.map(screenshotPath => this.copyFileToResults(screenshotPath, folderTest));
        const copiedAttachments = attachments.map(attachment => ({
            path: this.copyFileToResults(attachment.path, folderTest),
            name: attachment.name
        }));

        // Capture errors
        const errors = result.errors.map(error => this.ansiToHtml(error.message ?? 'No errors')) ?? [];

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
            videoPath: copiedVideoPath,
            screenshotPaths: copiedScreenshotPaths,
            attachments: copiedAttachments,
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