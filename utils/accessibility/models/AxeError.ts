import { Annotation } from '../../annotations/Annotation';
import { ImpactType } from './ImpactType';

export interface AxeError {
    id: string;
    target: string;
    errorDescription: string;
    help: string;
    helpUrl: string;
    impact: ImpactType;
    impactKey: string;
    summary: string;
    tags: string[];
    url: string;
    page: string;
    category: string;
    rule: string;
    html: string;
    errorNumber: number;
    screenshot: string;
    annotations: Annotation[];
}
