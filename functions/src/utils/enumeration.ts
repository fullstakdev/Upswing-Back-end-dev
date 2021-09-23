export enum IWorkoutStatus {
    NEW = 'new',
    MISSED = 'missed',
    COMPLETE = 'complete',
    PROGRESSIVE = 'progressive',
}

export enum IWorkoutType {
    VOD = 'vod',
    PLANNED = 'planned',
    LIVESTREAM = 'livestream',
    VIDEO_CONNECT = 'video_connect',
    IN_PERSON = 'in_person'
}

export enum IUserType {
    MEMBER = 'member',
    TRAINER = 'trainer',
}

export enum ILocationForProgram {
    HOME = 'home',
    HOME_GYM = 'home_gym',
    GYM = 'gym'
}

export enum IProgramLevel {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced'
}

export enum IProgramFormat {
    OWN_PACE = 'own_pace',
    GUIDED_GROUP = 'guided_group',
    ONE_TO_ONE = 'one_to_one',
}

export enum IGenderType {
    MAN = 'man',
    WOMAN = 'woman',
}
