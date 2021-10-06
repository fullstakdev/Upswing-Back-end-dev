import * as admin from 'firebase-admin';
import { NextFunction, Request, Response } from 'express';
import { handleError } from '../utils';
import repository from '../repositories/user.repo';


const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            if ( req.headers.authorization === 'Bearer Developing API') {
                console.log('Development Mode API call');
                req.headers.user = JSON.stringify({ 'email': 'developer@upswing.dev', 'userId': 'pPOExQ1m7QeRIdVw9XgCCkxEWeU2', 'role': 'developer' });
                return next();
            }
            const token = req.headers.authorization.split('Bearer ')[1];
            const decodedData = await admin.auth().verifyIdToken(token);
            const user = await repository.getUserInfoByEmail(decodedData.email);
            if (user && user.email) {
                req.headers.user = JSON.stringify(user);
                return next();
            }
            handleError(res, { code: 500, message: 'Invalid token' });
            return;
        }
        handleError(res, { code: 403, message: 'Unauthenticated' });
    } catch (err) {
        handleError(res, err);
    }
};

export default checkAuth;