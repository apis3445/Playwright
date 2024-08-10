import { Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { PrimeFacesMenu } from '../../components/PrimeFacesMenu';

export class EffizienteBasePage extends BasePage {

    menu: PrimeFacesMenu;
    baseURL = process.env.EFFIZIENTE_URL ? process.env.EFFIZIENTE_URL : 'https://effizientedemo.azurewebsites.net';

    constructor(page: Page, public readonly keyPage: string) {
        //We need the page, and a friendly name for the page to be used in reports
        super(page, keyPage);
        this.menu = new PrimeFacesMenu(page, this.annotationHelper);
    }
}