import { IGoalStatusType } from '../utils/enumeration';

export interface IGoal {
    id?: string;
    memberId: string;
    name: string;
    status?: IGoalStatusType;
    createdAt: number;
}
