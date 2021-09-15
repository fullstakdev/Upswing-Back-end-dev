export enum GBWorkoutStatus {
    new = 0,
    missed = -1,
    complete = 1,
    progressive = 2,
}

export enum GBWorkoutType {
    vod = 1,
    planned = 2,
    livestream = 3,
    video_connect = 4,
    in_person = 5
}

export enum GBUserType {
    member = "member",
    trainer = "trainer",
}

export enum GBLocationForProgram {
    home = 1,
    homeGym = 2,
    gym = 3
}

export enum GBProgramLevel {
    beginner = 1,
    intermediate = 2,
    advanced = 3
}

export enum GBProgramFormat {
    ownPace = 1,
    guidedGroup = 2,
    oneToOne = 3
}

export enum GBGenderType {
    man = 2,
    woman = 1,
}
