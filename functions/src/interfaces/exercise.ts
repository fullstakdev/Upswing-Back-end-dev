import { IDurationUnit } from './common';

export interface IRequiredCondition {
    weight: number;
    weightUnit: string;
}

export interface IExercise {
    id?: string;
    trainerId?: string;
    name: string;
    setsNumber: number;
    repeatsNumber: number;
    duration: number;
    durationUnit: IDurationUnit;
    recoveryDuration: number;
    recoveryDurationUnit: IDurationUnit;
    videoClipUrl: string;
    requiredConditions: IRequiredCondition[]
}
