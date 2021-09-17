export enum IDurationUnit {
    WEEK = "week",
    DAY = "day",
    MONTH = "month",
    MINUTE = "minute",
    SECOND = "second"
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

export class IResponseObject {
    success: boolean;
    payload?: Record<string, unknown>;
    error?: IErrorObject;
    timestamp: number;

    constructor(data: any) {
        this.success = data.success;
        this.timestamp = new Date().getTime();
        this.error = data.error;
        this.payload = data.payload;
    }
}
