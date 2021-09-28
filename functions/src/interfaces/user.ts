export interface IUserLocationType {
    lat: number;
    lng: number;
}

export interface IUserGoalType {
    goal: string;
    archive: boolean
}

export interface IUserAchievementType {
    currentStreak: number;
    longestStreak: number;
    programCompleted: number;
}

export interface IUser {
    id?: string;
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    roles: string[];
    birthday?: string;
    phone?: string,
    photo?: string,
    location?: IUserLocationType,
    goal?: IUserGoalType[],
    achievement?: IUserAchievementType,
    programIds?: number[];
    googleId?: string;
    appleId?: string;
    facebookId?: string;

    createdAt: number;
    updatedAt?: number;
}
