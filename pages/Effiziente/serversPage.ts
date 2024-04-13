import { Page } from '@playwright/test';
import { EffizienteBasePage } from './effizienteBasePage';
import { AnnotationType } from '../../utils/annotations/AnnotationType';
import { Heading } from '../../components/Heading';
import { Button } from '../../components/Button';
import { Table } from '../../components/TableComponent';

export class ServersPage extends EffizienteBasePage {
    readonly title: Heading;
    readonly add: Button;
    readonly delete: Button;
    readonly exportToExcel: Button;
    readonly table: Table;

    constructor(page: Page) {
        super(page, 'Servers');
        this.title = new Heading(page, this.annotationHelper, 'Servers');
        this.add = new Button(page, this.annotationHelper, 'Add');
        this.delete = new Button(page, this.annotationHelper, 'Delete');
        this.exportToExcel = new Button(page, this.annotationHelper, 'Export to Excel');
        this.table = new Table(page, this.annotationHelper);
    }

    /**
     * Go to servers page 
     */
    public async goTo() {
        const serversPage = this.baseURL + '/Security/servers';
        this.annotationHelper.addAnnotation(AnnotationType.GoTo, 'Go to the page: "' + serversPage + '"');
        await this.page.goto(serversPage);
        await this.title.locator.waitFor({ timeout: 30_000 });
    }

}