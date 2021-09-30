export enum IDurationUnit {
    WEEK = 'week',
    DAY = 'day',
    MONTH = 'month',
    MINUTE = 'minute',
    SECOND = 'second'
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

export interface IPaginationOption {
    page: number,
    limit: number,
    sort: string
}

export interface IGetCondition {
    key: string,
    operator: any,
    value: any
}

export interface IPaginationResponse {
    limit: number,
    prevPage: number,
    nextPage: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    totalPages: number,
    totalDocs: number,
    page: number,
    docs: Record<string, unknown>[]
}
