import { TestInfo } from '@playwright/test';
import { AxeError } from './models/AxeError';
import { Series } from './models/Series';
import { ErrorByPage } from './models/ErrorByPage';
import { ImpactType } from './models/ImpactType';
import { ImpactError } from './models/ImpactError';
import fs from 'fs';
import path from 'path';
import mustache from 'mustache';


export class PageErrors {
    private errorsByPage: ErrorByPage[] = [];
    private folderResults = 'test-results/';
    private series: Series[] = [];
    private critical = 0;
    private serious = 0;
    private moderate = 0;
    private minor = 0;

    constructor(private testInfo: TestInfo) {
        this.series.push(this.initArrayByPage('Minor'));
        this.series.push(this.initArrayByPage('Moderate'));
        this.series.push(this.initArrayByPage('Serious'));
        this.series.push(this.initArrayByPage('Critical'));
    }

    /** Init errors by page */
    private initArrayByPage(name: string) {
        return {
            name: name,
            data: []
        };
    }

    /**
     * Get summary of errors 
     * @returns Total error critical, serious, moderate and minor as string separated by ,
     */
    getSummary(keyPage: string, currentAxeErrors: AxeError[]) {
        const errorByPage: ErrorByPage = {
            page: keyPage,
            minor: 0,
            critical: 0,
            moderate: 0,
            serious: 0,
            total: 0
        };
        currentAxeErrors.forEach(element => {
            errorByPage.total++;
            switch (element.impact) {
                case ImpactType.critical:
                    errorByPage.critical += 1;
                    this.critical++;
                    break;
                case ImpactType.serious:
                    errorByPage.serious += 1;
                    this.serious++;
                    break;
                case ImpactType.moderate:
                    errorByPage.moderate += 1;
                    this.moderate++;
                    break;
                case ImpactType.minor:
                    errorByPage.minor += 1;
                    this.minor++;
                    break;
            }
        });
        this.errorsByPage.push(errorByPage);
        this.errorsByPage.sort((a, b) => b.total - a.total);
        return `${this.minor},${this.moderate},${this.serious},${this.critical}`;
    }

    /**
     * Get errors by page
     * @returns Array of errors by page
     */
    getErrorsBySeries() {
        this.errorsByPage.forEach(element => {
            this.series[ImpactError.minor].data.push(element.minor);
            this.series[ImpactError.moderate].data.push(element.moderate);
            this.series[ImpactError.serious].data.push(element.serious);
            this.series[ImpactError.critical].data.push(element.critical);
        });
        return this.series;
    }

    /**
     * Get the pages
     * @returns 
     */
    getPages() {
        return this.errorsByPage.map(e => e.page);
    }

    /** Attach html bugs by Page */
    async attachBugsByPage(keyPage: string, currentAxeErrors: AxeError[]) {
        if (currentAxeErrors.length == 0)
            return;
        const templateFile = 'accessibilityPage.html';
        const pageFile = 'Page' + keyPage + '.html';
        const pageFilePath = this.folderResults + pageFile;
        const pageTemplate = fs.readFileSync(path.resolve(__dirname, 'templates', templateFile), {
            encoding: 'utf8',
        });

        const htmlPageContent = mustache.render(pageTemplate,
            {
                axeErrors: currentAxeErrors,
                page: keyPage,
                minorColor: ImpactType.minor,
                moderateColor: ImpactType.moderate,
                seriousColor: ImpactType.serious,
                criticalColor: ImpactType.critical,
            });
        fs.writeFileSync(pageFilePath, htmlPageContent);
        await this.testInfo.attach(pageFile, { path: pageFilePath });
    }
}