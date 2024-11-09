import { Page } from '@playwright/test';
import { EffizienteBasePage } from './effizienteBasePage';
import { Heading } from '../../components/Heading';
import { InputText } from '../../components/InputText';
import { Button } from '../../components/Button';
import { ServerApi } from '../../api/Effiziente/Server.api';
import { AnnotationType } from '../../utils/annotations/AnnotationType';

export class AddServerPage extends EffizienteBasePage {
    title: Heading = new Heading(this.page, this.annotationHelper, 'Servers');
    key: InputText = new InputText(this.page, this.annotationHelper, '[name="key"]', false);
    name: InputText = new InputText(this.page, this.annotationHelper, '[name="name"]', false);
    url: InputText = new InputText(this.page, this.annotationHelper, '[name="url"]', false);
    save: Button = new Button(this.page, this.annotationHelper, 'Save');
    cancel: Button = new Button(this.page, this.annotationHelper, 'Cancel');
    serverApi: ServerApi;

    constructor(page: Page) {
        super(page, 'AddServer');
        this.serverApi = new ServerApi(page);
    }

    /**
     * Save and return server id
     * @returns Server id
     */
    async saveClick() {
        return await this.addStepWithAnnotation(AnnotationType.Step, 'Save server and return server id from api', async () => {
            const responseCreatePromise = this.serverApi.waitForCreateServer();
            const responseGetPromise = this.serverApi.waitForGetServers();
            await this.save.click();
            const responseCreate = await responseCreatePromise;
            await responseGetPromise;
            const responseText = JSON.parse(await responseCreate.text());
            return +responseText.Id;
        });
    }
}