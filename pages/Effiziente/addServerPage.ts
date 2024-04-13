import { Page } from '@playwright/test';
import { EffizienteBasePage } from './effizienteBasePage';
import { Heading } from '../../components/Heading';

export class ServersPage extends EffizienteBasePage {
    title: Heading = new Heading(this.page, this.annotationHelper, 'Servers');

    constructor(page: Page) {
        super(page, 'AddServer');
    }
}