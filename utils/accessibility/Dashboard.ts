import { Icons } from './Icons';
import { TestInfo } from '@playwright/test';
import { AxeError } from './models/AxeError';
import { PageErrors } from './PageErrors';
import { ImpactType } from './models/ImpactType';
import { PageWCAGLevel } from './PageWCAGLevel';
import { ErrorByImpact } from './models/ErrorByImpact';
import fs from 'fs';
import path from 'path';
import mustache from 'mustache';

export class Dashboard {

    private currentAxeErrors: AxeError[] = [];
    private summaryByImpact: ErrorByImpact[] = [];
    private impactErrors: string;
    private pageWCAGLevel: PageWCAGLevel;
    private pageErrors: PageErrors;
    private totalErrors: number;
    private folderResults = 'test-results/';
    private folderAnnotations = 'test-annotations';
    private folderPath: string;

    constructor(protected testInfo: TestInfo) {
        this.pageWCAGLevel = new PageWCAGLevel();
        this.pageErrors = new PageErrors(this.testInfo);
        this.folderPath = path.join(__dirname, '..', '..', this.folderAnnotations);
        this.totalErrors = 0;
        this.impactErrors = '';
    }

    /**
     * Get summary by impact
     * @param accessibilityError axe Accessibility Error
     */
    getSummary() {
        const icons = new Icons();
        for (const currentAxeError of this.currentAxeErrors) {
            const id = currentAxeError.id;
            const impact = currentAxeError.impactKey;
            const helpUrl = currentAxeError.helpUrl;
            const category = currentAxeError.category;
            const rule = currentAxeError.rule;
            let summary = this.summaryByImpact.find(e => e.axeRuleId == id);
            if (summary)
                summary.total = summary.total + 1;
            else {
                summary = {
                    axeRuleId: id,
                    impact: impact,
                    total: 1,
                    helpUrl: helpUrl,
                    icon: icons.getIcon(id),
                    category: category,
                    rule: rule
                };
                this.summaryByImpact.push(summary);
            }
        }
        this.summaryByImpact.sort((a, b) => b.total - a.total);
    }

    /**
     * Save results to file
     * @param fileName File name
     */
    async saveToFile(fileName: string, currentAxeErrors: AxeError[]) {
        const file = fileName + '.json';
        if (!fs.existsSync(this.folderPath))
            fs.mkdirSync(this.folderPath, { recursive: true });
        const filePath = path.join(this.folderPath, file);
        fs.writeFileSync(filePath, JSON.stringify(currentAxeErrors));
    }

    /**
    * Read files Results
    */
    readFiles() {
        try {
            const files = fs.readdirSync(this.folderPath);
            files.forEach(file => {
                const filePath = path.join(this.folderPath, file);
                // reading a JSON file synchronously
                const data = fs.readFileSync(filePath, 'utf8');
                if (data) {
                    const axeErrors = JSON.parse(data);
                    this.currentAxeErrors = this.currentAxeErrors.concat(axeErrors);
                    this.totalErrors = this.currentAxeErrors.length;
                    const keyPage = path.parse(file).name;
                    this.impactErrors = this.pageErrors.getSummary(keyPage, this.currentAxeErrors);
                }
            });
        } catch (error) {
            // logging the error
            console.error(error);
            throw error;
        }
    }

    /**
     * Clean the folder for results
     */
    cleanFolder() {
        fs.rmSync(this.folderPath, { recursive: true, force: true });
    }

    /**
     * Generate dashboard
     */
    async generateDashboard() {
        this.readFiles();
        this.getSummary();
        this.pageWCAGLevel.getByLevel(this.currentAxeErrors);
        if (this.totalErrors == 0) {
            const noErrorFile = 'noError.html';
            const noErrorFilePath = path.resolve(__dirname, 'templates', noErrorFile);
            const htmlNoErrorContent = this.getTemplateFilePath(noErrorFile);
            await this.testInfo.attach('NoError', { path: noErrorFilePath });
            fs.writeFileSync(this.folderResults + noErrorFile, htmlNoErrorContent);
            return;
        }
        const dashboardFile = 'accessibilityDashboard.html';
        const dashboardFilePath = this.folderResults + dashboardFile;
        const dashboardTemplate = this.getTemplateFilePath(dashboardFile);
        const htmlDashboardContent = mustache.render(dashboardTemplate,
            {
                pages: this.pageErrors.getPages(),
                minorColor: ImpactType.minor,
                moderateColor: ImpactType.moderate,
                seriousColor: ImpactType.serious,
                criticalColor: ImpactType.critical,
                series: JSON.stringify(this.pageErrors.getErrorsBySeries()),
                impactErrors: this.impactErrors,
                errorsByImpact: this.summaryByImpact,
                levelAErrors: this.pageWCAGLevel.getLevelAErrors(),
                levelAPAges: this.pageWCAGLevel.getLevelAPages(),
                levelAAErrors: this.pageWCAGLevel.getLevelAAErrors(),
                levelAAPAges: this.pageWCAGLevel.getLevelAAPages()
            });
        fs.writeFileSync(dashboardFilePath, htmlDashboardContent);
        await this.testInfo.attach('AccessibilityDashboard', { path: dashboardFilePath });
    }

    /**
     * Get template content for the template file name
     * @param templateFileName Template file name
     * @returns 
     */
    getTemplateFilePath(templateFileName: string) {
        return fs.readFileSync(path.resolve(__dirname, 'templates', templateFileName), {
            encoding: 'utf8',
        });
    }
}