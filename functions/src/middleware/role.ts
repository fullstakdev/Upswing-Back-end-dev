import { NextFunction, Request, Response } from 'express';
import { AllUserRoles } from '../utils/constants';
import { handleError } from '../utils';
import { IUserRoleType } from '../utils/enumeration';

const checkRole = (role: IUserRoleType) => (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.user, role);
    try {
        if (req.body.user.role === 'developer') return next();
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