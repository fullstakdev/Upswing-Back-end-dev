export interface IRequiredCondition {
    weight: number;
    weightUnit: string;
}

export interface IExercise {
    id?: string;
    trainerId?: string;
    name: string;
    setsNumber?: number;
    repeatsNumber?: number;
    duration?: number;
    durationUnit?: string;
    recoveryDuration?: number;
    recoveryDurationUnit?: string;
    videoClipUrl: string;
    requiredWeight: boolean;
    requiredConditions?: IRequiredCondition;
}
