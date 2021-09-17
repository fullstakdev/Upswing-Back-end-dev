import { IImageType, IDurationUnit } from "./common";
import { IUser } from "./user";

export enum IProgramSportType {
    FOOTBALL = "football",
    BASKETBALL = "basketball",
    SOCCER = "soccer",
    ICE_HOCKEY = "ice_hockey",
    LACROSSE = "lacrosse",
    TRACK_FIELD = "track_field",
    BASEBALL = "baseball",
    OTHER = "other"
}

export enum IProgramType {
    STRENGTH_TRAINING= "strength_training",
    YOGA = "yoga",
    OLYMPIC_LIFTING = "olympic_lifting",
    CROSS_FIT = "cross_fit",
    HIIT_TABATA = "hiit_tabata",
    BARRE = "barre",
    RUNNING = "running",
    CYCLING = "cycling",
    SWIMMING = "swimming",
    PRE_POST_NATAL = "pre_post_natal",
}

export enum IProgramFormat {
    OWN_PLACE = 'own_place',
    GUIDED_GROUP = 'guided_group',
    ONE_ONE = 'one_one'
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

export interface IProgram {
    id?: string;
    name: string;
    types: (IProgramType | IProgramSportType)[];
    location: IProgramLocationType;
    level: IProgramLevel;
    format: IProgramFormat;
    rating: number;
    duration: number;
    durationUnit: IDurationUnit;
    price: number;
    currency: string;
    image: IImageType;
    trainerId?: string,
    trainer?: IUser;
}
