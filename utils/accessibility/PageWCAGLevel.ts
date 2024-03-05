import { AxeError } from './models/AxeError';
import { ErrorByLevel } from './models/ErrorByLevel';

export class PageWCAGLevel {

    private errorsALevel: ErrorByLevel[] = [];
    private errorsAALevel: ErrorByLevel[] = [];
    private readonly wcagLevelsA = ['wcag2a', 'wcag21a'];
    private readonly wcagLevelsAA = ['wcag2aa', 'wcag21aa', 'wcag22aa'];

    /** Get by page and level */
    getByLevel(currentAxeErrors: AxeError[]) {
        for (const currentAxeError of currentAxeErrors) {
            this.errorsALevel = this.getErrorsByWCAGLevel(this.wcagLevelsA, currentAxeError, this.errorsALevel);
            this.errorsAALevel = this.getErrorsByWCAGLevel(this.wcagLevelsAA, currentAxeError, this.errorsAALevel);
        }
        this.errorsALevel.sort((a, b) => b.total - a.total);
        this.errorsAALevel.sort((a, b) => b.total - a.total);
    }

    /** Get errors by wcag level */
    getErrorsByWCAGLevel(wcagLevels: string[], currentAxeError: AxeError, errorsByLevel: ErrorByLevel[]) {
        if (wcagLevels.indexOf(currentAxeError.rule) >= 0) {
            let errorByLevel = errorsByLevel.find(e => e.page == currentAxeError.page);
            if (errorByLevel)
                errorByLevel.total = errorByLevel.total + 1;
            else {
                errorByLevel = {
                    page: currentAxeError.page,
                    total: 1
                };
                errorsByLevel.push(errorByLevel);
            }
        }
        return errorsByLevel;
    }

    /** Get errors by wcag level A as string coma separated value */
    getLevelAErrors() {
        return this.errorsALevel.map(e => e.total).join(',');
    }

    /** Get errors by wcag level A as string coma separated value */
    getLevelAAErrors() {
        return this.errorsAALevel.map(e => e.total).join(',');
    }

    /**
     * Get Pages with level A errors
     * @returns 
     */
    getLevelAPages() {
        return this.errorsALevel.map(e => e.page);
    }

    /**
     * Get Pages with level AA errors
     * @returns 
     */
    getLevelAAPages() {
        return this.errorsAALevel.map(e => e.page);
    }
}