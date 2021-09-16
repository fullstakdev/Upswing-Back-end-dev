import * as admin from 'firebase-admin';
import { NextFunction, Request, Response } from 'express';
import { handleError } from '../utils';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            const token = req.headers.authorization;
            req.body.user = await admin.auth().verifyIdToken(token);
            return next();
        }
        handleError(res, { code: 403, message: 'Unauthenticated' });
    } catch (err) {
        handleError(res, err);
    }
};

export default checkAuth;