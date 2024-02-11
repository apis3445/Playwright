import { Page } from '@playwright/test';
import { EffizienteBasePage } from './effizienteBasePage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

export class DashboardPage extends EffizienteBasePage {

    constructor(page: Page) {
        super(page, 'Dashboard');
    }

    /**
     * Go to dashboard page 
     */
    public async goTo() {
        const dashboardPage = this.baseURL + '/AccountsReceivable/dashboard';
        this.annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to the page: "' + dashboardPage + '"');
        await this.page.goto(dashboardPage);
        await this.page.locator('#title').waitFor({ timeout: 20000 });
    }

}