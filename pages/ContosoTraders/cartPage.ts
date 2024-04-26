/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page } from '@playwright/test';
import { ContosoBasePage } from './contosoBasePage';

export class CartPage extends ContosoBasePage {



    constructor(page: Page) {
        super(page, 'Home');
    }

}