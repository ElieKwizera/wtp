import {User} from "../entity/User";
import jwt from 'jsonwebtoken';

export const generateToken  = async (user : User) => {
    return await jwt.sign( {id: user.id}, process.env.SECRET_KEY, { algorithm : "hmac" });
 }


