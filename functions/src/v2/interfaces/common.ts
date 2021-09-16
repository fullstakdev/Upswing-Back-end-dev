export enum IDurationUnit {
    WEEK = 'week',
    DAY = 'day',
    MONTH = 'month'
}

export interface IImageType {
    sm: string;
    medium: string;
    origin: string
}

export interface IErrorObject {
    code: number,
    message: any
}

export interface IResponseObject {
    success: boolean,
    payload?: Record<string, unknown>[],
    error?: IErrorObject,
    timestamp: number
}