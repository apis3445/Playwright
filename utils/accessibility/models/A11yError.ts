import { Target } from './Target';

export interface A11yError {
    id: string;
    description: string;
    wcagRule: string;
    severity: string;
    help: string;
    helpUrl: string;
    guideline: string;
    total: number;
    target: Target[];
}