export enum IWorkoutType {
    VOD = 'vod',
    PLANNED = 'planned',
    LIVESTREAM = 'livestream',
    VIDEO_CONNECT = 'video_connect',
    IN_PERSON = 'in_person'
}

export interface IPlannedType {
    exerciseIds: string[];
}

export interface IVodType {
    videoTitle: string;
    videoUrl: string
}

export interface ILiveStreamType {
    videoTitle: string;
    videoUrl: string;
}

export interface IVideoConnectType {
    trainerVideo: string;
    otherVideo: string[];
}

export interface IInPersonType {
    duration: number;
    duration_unit: string;
    location: string;
}

export interface IWorkout {
    id?: string;
    name: string;
    trainerId: string;
    type: string;
    rating?: number;
    difficulty?: number
    equipment?: string;
    planned?: IPlannedType;
    vod?: IVodType;
    livestream?: ILiveStreamType;
    video_connect?: IVideoConnectType;
    in_person?: IInPersonType;
}
