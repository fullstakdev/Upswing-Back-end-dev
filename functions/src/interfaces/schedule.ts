import { IWorkout } from "./workout";

export enum IScheduleStatusType {
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELED = "canceled"
}

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
    schedules: IScheduleItem[]
}
