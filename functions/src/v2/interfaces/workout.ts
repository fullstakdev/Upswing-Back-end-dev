export enum IWorkoutType {
    VOD = 'vod',
    PLANNED = 'planned',
    LIVESTREAM = 'livestream',
    VIDEO_CONNECT = 'video_connect',
    IN_PERSON = 'in_person'
}

export interface IPlannedType {
    exerciseIds: string[]
}

export interface IWorkout {
    id?: string;
    name: string;
    trainerId: string;
    type: IWorkoutType;
    planned?: IPlannedType;
    rating?: number;
    difficulty?: number
}
