import { Request, Response, NextFunction } from 'express';
import * as status from 'statuses';
import { validationResult } from 'express-validator';
import { IErrorObject, IResponseObject } from '../interfaces/common';

export const buildErrObject = (code: number, message: any): IErrorObject => {
    return {
        code,
        message,
    };
};

export const buildResponseObject = (data: any): IResponseObject => {
    return {
        success: data.success,
        payload: data.payload || {},
        error: data.error || {},
        timestamp: new Date().getTime(),
    };
};

export const handleSuccess = (res: Response, data: any, code = 200) => {
    if (code && status.codes.indexOf(code) >= 0) {
        return res.status(code).json({
            ...buildResponseObject({ success: true, payload: data }),
        });
    }

    return res.status(500).json({
        ...buildResponseObject({ success: false }),
    });
};

export const handleError = (res: Response, err: IErrorObject) => {
    if (err.code && status.codes.indexOf(err.code) >= 0) {
        return res.status(err.code).json({
            ...buildResponseObject({ error: err.message, success: false }),
        });
    }

    return res.status(500).json({
        ...buildResponseObject({ error: err.message, success: false }),
    });
};

export const handleValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        return handleError(res, buildErrObject(422, err.array()));
    }
};

export const paginationHandler = (paginationData: any[], currentPage: number, perPage: number) => {
    const totalDocs = paginationData.length;
    const totalPages = Math.ceil(totalDocs / perPage);
    let nextPage = totalPages > currentPage ? currentPage + 1 : currentPage;
    let prevPage = currentPage - 1 > 0 ? currentPage - 1 : currentPage;

    const result = {
        docs: paginationData,
        limit: perPage,
        page: currentPage,
        totalPages: totalPages,
        totalDocs: totalDocs,
        hasPrevPage: nextPage === currentPage ? false : true,
        hasNextPage: prevPage === currentPage ? false : true,
        prevPage: prevPage,
        nextPage: nextPage,
    };
    return result;
}