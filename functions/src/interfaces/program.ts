import { IImageType } from './common';
import { IUser } from './user';
import { IProgramFormat, IProgramLevel, IProgramLocationType, IProgramType, IProgramSportType, IDurationUnit } from '../utils/enumeration';

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
