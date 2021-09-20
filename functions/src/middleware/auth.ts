import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils";
import userRepository from "../repositories/user.repo";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            const token = req.headers.authorization.split('Bearer ')[1];
            const decodedData = await admin.auth().verifyIdToken(token);
            const user = await userRepository.getUserById(decodedData.uid);
            req.body.user = user;
            return next();
        }
        handleError(res, { code: 403, message: "Unauthenticated" });
    } catch (err) {
        handleError(res, err);
    }
};

export default checkAuth;