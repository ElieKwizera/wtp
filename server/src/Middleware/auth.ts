import {Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {User} from "../entity/User";

export interface AppRequest extends Request{
    user: User
}

export const authenticate = async (req : AppRequest, res : Response , next)=> {
    const token = req.header("Authorization").split("")[1];
    if (!token) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
    try {
        const decoded : JwtPayload = <JwtPayload>jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({id: decoded.id});
        if (!req.user.verified)
        {
            return res.status(403).json({
                message: "Please verify your email to use the app"
            });
        }
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
}