import { IUserRoleType } from '../utils/enumeration';

export const COLLECTION_WORKOUT = 'workouts';
export const COLLECTION_USER = 'users';
export const COLLECTION_EXERCISE = 'exercises';
export const COLLECTION_GOAL = 'goal';
export const COLLECTION_PROGRAM = 'programs';

export const AllUserRoles = [
    IUserRoleType.ADMIN,
    IUserRoleType.TRAINER,
    IUserRoleType.MEMBER,
];