import { NextFunction, Request, Response } from 'express';
import { AllUserRoles } from '../utils/constants';
import { handleError } from '../utils';
import { IUserRoleType } from '../interfaces/user';

const checkRole = (role: IUserRoleType) => (req: Request, res: Response, next: NextFunction) => {
    try {
        if (
            AllUserRoles.indexOf(role) >= 0 &&
            req.body.user &&
            req.body.user.role &&
            req.body.user.role === role
        ) {
            return next();
        }
        handleError(res, { code: 401, message: 'Unauthorized' });
    } catch (err) {
        handleError(res, err);
    }
};

export default checkRole;