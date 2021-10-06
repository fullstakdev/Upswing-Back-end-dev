export enum IScheduleStatusType {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELED = 'canceled'
}

export enum IProgramSportType {
    FOOTBALL = 'football',
    BASKETBALL = 'basketball',
    SOCCER = 'soccer',
    ICE_HOCKEY = 'ice_hockey',
    LACROSSE = 'lacrosse',
    TRACK_FIELD = 'track_field',
    BASEBALL = 'baseball',
    OTHER = 'other'
}

export enum IProgramType {
    STRENGTH_TRAINING= 'strength_training',
    YOGA = 'yoga',
    OLYMPIC_LIFTING = 'olympic_lifting',
    CROSS_FIT = 'cross_fit',
    HIIT_TABATA = 'hiit_tabata',
    BARRE = 'barre',
    RUNNING = 'running',
    CYCLING = 'cycling',
    SWIMMING = 'swimming',
    PRE_POST_NATAL = 'pre_post_natal',
}

export enum IProgramFormat {
    OWN_PACE = 'own_pace',
    GUIDED_GROUP = 'guided_group',
    ONE_TO_ONE = 'one_to_one',
}

export enum IProgramLevel {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced'
}

export enum IProgramLocationType {
    HOME = 'home',
    HOME_GYM = 'home_gym',
    GYM = 'gym'
}

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

export enum IGoalStatusType {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELED = 'canceled'
}
export enum IGoalStatus {
    PENDING = 'pending',
    COMPLETE = 'complete',
}

export enum IUserRoleType {
    ADMIN = 'admin',
    TRAINER = 'trainer',
    MEMBER = 'member'
}

export enum ILocationForProgram {
    HOME = 'home',
    HOME_GYM = 'home_gym',
    GYM = 'gym'
}

export enum IGenderType {
    MAN = 'man',
    WOMAN = 'woman',
}

export enum IDurationUnit {
    WEEK = 'week',
    DAY = 'day',
    MONTH = 'month',
    MINUTE = 'minute',
    SECOND = 'second'
}
