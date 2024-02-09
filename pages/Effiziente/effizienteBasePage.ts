import { Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { PirmeFacesMenu } from '../../components/PrimeFacesMenu';

export class EffizienteBasePage extends BasePage {

    menu: PirmeFacesMenu;
    baseURL = process.env.EFFIZIENTE_URL ? process.env.EFFIZIENTE_URL : 'https://effizientedemo.azurewebsites.net';

    constructor(page: Page, public readonly keyPage: string) {
        //We need the page, and a friendly name for the page to be used in reports
        super(page, keyPage);
        this.menu = new PirmeFacesMenu(page, this.annotationHelper);
    }
}