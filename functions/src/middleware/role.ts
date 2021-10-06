import { NextFunction, Request, Response } from 'express';
import { AllUserRoles } from '../utils/constants';
import { handleError, getUserInfoByToken } from '../utils';
import { IUserRoleType } from '../utils/enumeration';

const checkRole = (role: IUserRoleType) => (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = getUserInfoByToken(req);
    console.log('checking user information: ', loggedUser, role);
    try {
        if (loggedUser.role === 'developer') return next();
        if (
            AllUserRoles.indexOf(role) >= 0 &&
            loggedUser &&
            loggedUser.role &&
            loggedUser.role === role
        ) {
            return next();
        }
        handleError(res, { code: 401, message: 'Unauthorized' });
    } catch (err) {
        handleError(res, err);
    }
};

export default checkRole;