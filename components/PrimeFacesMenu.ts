import { Page } from '@playwright/test';
import { Menu } from './Menu';
import { AnnotationHelper } from '../utils/annotations/AnnotationHelper';
import { BaseComponent } from './BaseComponent';

export class PirmeFacesMenu extends BaseComponent implements Menu {

    topMenuLocator = 'app-menu > p-menubar > .p-menubar > p-menubarsub > ul > li > .p-menuitem-content > a > .p-menuitem-text';

    constructor(protected page: Page, protected annotationHelper: AnnotationHelper) {
        super(page, annotationHelper);
    }

    /**
     * Get top menus
     * @returns Top menus texts
     */
    getTopMenus(): Promise<string[]> {
        const stepDescription = 'Get top menus';
        return this.addStepWithAnnotation(stepDescription, async () => {
            return this.page.locator(this.topMenuLocator).allInnerTexts();
        });
    }
}