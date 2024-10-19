import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { AnnotationType } from '../annotations/AnnotationType';
import { TestStatusIcon } from './models/TestStatusIcon';
import { TestResults } from './models/TestResults';
import { FileHelper } from '../FileHelper';
import { HtmlHelper } from '../HtmlHelper';
import * as path from 'path';

class StepReporter implements Reporter {
    private testNo = 0;
    private fileHelper: FileHelper = new FileHelper();
    private htmlHelper: HtmlHelper = new HtmlHelper();
    async onTestEnd(test: TestCase, result: TestResult) {
        const results: TestResults[] = [];

        this.testNo++;
        const folderTest = path.join(this.fileHelper.folderResults, this.testNo.toString());
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

        const attachments: { path: string, name: string }[] = result.attachments
            .filter(attachment => attachment.name !== 'screenshot' && attachment.name !== 'video')
            .map(attachment => ({ path: attachment.path ?? '', name: attachment.name ?? '' })) ?? [];
        const copiedAttachments = attachments.map(attachment => ({
            path: this.fileHelper.copyFileToResults(folderTest, attachment.path),
            name: attachment.name
        }));

        const videoPath = this.fileHelper.copyVideo(result, folderTest);
        const screenshotPaths = this.fileHelper.copyScreenshots(result, folderTest);

        // Capture errors
        const errors = result.errors.map(error => this.htmlHelper.ansiToHtml(error.message ?? 'No errors')) ?? [];

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
            attachments: copiedAttachments,
            errors: errors
        });

        await this.htmlHelper.replaceTags('stepReporter.html', { results: results }, folderTest, filePath);
    }
}

export default StepReporter;