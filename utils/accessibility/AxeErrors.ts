import { Result } from 'axe-core';
import { Annotation } from '../annotations/Annotation';
import { AxeError } from './models/AxeError';
import { ImpactType } from './models/ImpactType';

export class AxeErrors {

    private errorNumber = 0;
    private axeErrors: AxeError[] = [];
    private currentAxeErrors: AxeError[] = [];

    constructor(private currentUrl: string, private annotations: Annotation[]) {

    }

    /**
     * Map elements to generic axe error
     */
    mapElements(keyPage: string, accessibilityErrors: Result[]) {
        this.currentAxeErrors = [];
        for (const accessibilityError of accessibilityErrors) {
            for (let j = 0; j < accessibilityError.nodes.length; j++) {
                this.getAxeErrors(accessibilityError, j, keyPage);
            }
        }
        return this.currentAxeErrors;
    }

    /**
     * Get axe errors
     * @param accessibilityError axe Accessibility Error
     * @param {number} i index
     * @param {string} keyPage friendly page
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAxeErrors(accessibilityError: any, i: number, keyPage: string) {
        const target = accessibilityError.nodes[i].target[0];
        const id = accessibilityError.id;
        const { category, rule } = this.getRules(accessibilityError);
        let axeError = this.axeErrors.find(e => e.target == target && e.id == id);
        if (!axeError) {
            axeError = {
                id: id,
                target: target,
                errorDescription: accessibilityError.description,
                help: accessibilityError.help,
                helpUrl: accessibilityError.helpUrl,
                impactKey: accessibilityError.impact,
                impact: ImpactType[accessibilityError.impact as keyof typeof ImpactType],
                summary: accessibilityError.nodes[i].failureSummary,
                tags: accessibilityError.tags,
                url: this.currentUrl,
                page: keyPage,
                category: category,
                rule: rule,
                html: accessibilityError.nodes[i].html,
                errorNumber: ++this.errorNumber,
                screenshot: `${keyPage}.${this.errorNumber}.${id}.png`,
                annotations: this.annotations
            };
            this.axeErrors.push(axeError);
            this.currentAxeErrors.push(axeError);
        }
    }

    /**
     * Get rules
     * @param accessibilityError 
     * @returns 
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getRules(accessibilityError: any) {
        const tags = accessibilityError.tags;
        let category = '';
        let rule = '';
        const wcagLevels = ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
        for (const tag of tags) {
            if (wcagLevels.indexOf(tag) >= 0) {
                category = tag;
                rule = tag;
                continue;
            }
            if (tag.startsWith('best-practice'))
                rule = tag;
        }
        return { category, rule };
    }
}