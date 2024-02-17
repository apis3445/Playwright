import { Page } from '@playwright/test';
import { EffizienteBasePage } from './effizienteBasePage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import { Heading } from '../../components/Heading';
import { Canvas } from '../../components/Canvas';
import { VisualHelper } from '../../utils/VisualHelper';

export class DashboardPage extends EffizienteBasePage {

    readonly title: Heading;
    readonly top5: Canvas;
    readonly top5Debt: Canvas;
    readonly top5DaysDelay: Canvas;
    readonly summaryExpiration: Canvas;
    protected visualHelper = new VisualHelper(this.page, this.keyPage);

    constructor(page: Page) {
        super(page, 'Dashboard');
        const noByRole = false;
        this.title = new Heading(page, this.annotationHelper, '#title', noByRole);
        this.top5 = new Canvas(page, this.annotationHelper, '#top5 canvas');
        this.top5Debt = new Canvas(page, this.annotationHelper, '#top5Debt canvas');
        this.top5DaysDelay = new Canvas(page, this.annotationHelper, '#top5DaysDelay canvas');
        this.summaryExpiration = new Canvas(page, this.annotationHelper, '#summaryExpiration');
    }

    /**
     * Go to dashboard page 
     */
    public async goTo() {
        const dashboardPage = this.baseURL + '/AccountsReceivable/dashboard';
        this.annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to the page: "' + dashboardPage + '"');
        await this.page.goto(dashboardPage);
        await this.title.locator.waitFor({ timeout: 20_000 });
    }

    /**
     * Wait to load the charts
     */
    public async waitForCharts() {
        await this.page.locator(this.top5.name).waitFor();
        await this.page.locator(this.top5Debt.name).waitFor();
        await this.page.locator(this.top5DaysDelay.name).waitFor();
        await this.page.locator(this.summaryExpiration.name).waitFor();
    }

    /**
     * Check snapshot
     */
    public async checkSnapshot() {
        await this.visualHelper.checkPageSnapshot('dashboard.png', 20_000);
    }

}