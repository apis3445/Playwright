import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';

export class Table extends BaseComponent {
    constructor(page: Page, annotationHelper: AnnotationHelper) {
        super(page, annotationHelper);
    }

    async clickInEditById(id: number) {
        const columnsText = await this.page.locator('th').allInnerTexts();
        const idIndex = columnsText.indexOf('Id');
        const row = this.page.getByRole('row', { name: id.toString() }).filter({ has: this.page.locator('td').nth(idIndex) }).getByText(id.toString());
        await row.locator('[aria-label="Edit"]').click();

    }
}