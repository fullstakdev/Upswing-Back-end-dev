export enum IGoalStatusType {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELED = 'canceled'
}

export interface IGoal {
    id?: string;
    memberId: string;
    name: string;
    status?: IGoalStatusType;
    createdAt: number;
}
