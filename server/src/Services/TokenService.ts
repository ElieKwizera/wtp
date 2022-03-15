import {User} from "../entity/User";
import jwt from 'jsonwebtoken';
import {getCustomRepository} from "typeorm";
import {UserRepository} from "../Repositories/UserRepository";

 interface JwtPayload {
    id? : number
}

export const generateToken  = (user : User) => {
  return jwt.sign({id:user.id}, process.env.SECRET_KEY, { expiresIn : "2days"});
 };

export const validateToken  = async (token:string) : Promise<User> => {
    try {
        const decoded : JwtPayload = <JwtPayload>jwt.verify(token, process.env.SECRET_KEY);
        const userRepository  = getCustomRepository(UserRepository);
        const user = await userRepository.findOne({id: decoded.id});
        user.verified = true;
        await user.save();
        return user;
    }
    catch (e) {
        console.log(e.message);
        return null;
    }
}

