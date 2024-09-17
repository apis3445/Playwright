import * as fs from 'fs';
import * as path from 'path';
import { TestResult } from '@playwright/test/reporter';

export class FileHelper {

    folderResults = 'steps-report/';

    copyFileToResults(destFolder: string, srcPath: string) {

        const fileName = path.basename(srcPath);
        const destDir = path.resolve(__dirname, '..', '..', destFolder);
        const destFile = path.join(destDir, fileName);

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        fs.copyFileSync(srcPath, destFile);
        return fileName;
    }

    copyVideo(result: TestResult, folderTest: string) {
        const videoPath = result.attachments.find(attachment => attachment.name === 'video')?.path;
        if (videoPath) {
            const copiedVideoPath = this.copyFileToResults(folderTest, videoPath);
            return copiedVideoPath;
        }
        return '';
    }
}