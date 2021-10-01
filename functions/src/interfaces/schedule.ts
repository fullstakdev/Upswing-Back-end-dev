import { IWorkout } from './workout';
import { IScheduleStatusType } from '../utils/enumeration';

export interface IScheduleItem {
    id: string,
    startTime: string;
    endTime: string;
    status: IScheduleStatusType;
    workout: IWorkout;
}
export interface ISchedule {
    date: Date;
    status: IScheduleStatusType;
    schedules: IScheduleItem[];
    createdAt: number;
}
