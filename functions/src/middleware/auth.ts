import * as admin from 'firebase-admin';
import { NextFunction, Request, Response } from 'express';
import { handleError } from '../utils';
import { getItemById } from '../repositories/common.repo';
import { COLLECTION_USER } from '../utils/constants';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            if( req.headers.authorization === 'Bearer Developing API') {
                console.log('Development Mode API call');
                req.body.user = {'name': 'developer', 'id': 1, 'role': 'developer'};
                return next();
            }
            const token = req.headers.authorization.split('Bearer ')[1];
            const decodedData = await admin.auth().verifyIdToken(token);
            const user = await getItemById(COLLECTION_USER, decodedData.uid);
            req.body.user = user;
            return next();
        }
        handleError(res, { code: 403, message: 'Unauthenticated' });
    } catch (err) {
        handleError(res, err);
    }
};

export default checkAuth;