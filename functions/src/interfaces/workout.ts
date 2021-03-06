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
    // place: string;
    // address: string;
    // coordinate: number;
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
    startTime: number;
    createdAt: number;
    updatedAt?: number;
}

export interface ISearchWorkoutParams {
    name?: string;
    type?: string;
    ids?: string[];
    trainerId?: string;
    from?: number;
    to?: number;
    page?: number;
    limit?: number;
    sort?: string;
  }