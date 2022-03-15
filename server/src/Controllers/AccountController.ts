import {Request, Response} from "express";
import {validate} from "../utils/Validations";
import {generateToken, validateToken} from "../Services/TokenService";
import {getCustomRepository} from "typeorm";
import {UserRepository} from "../Repositories/UserRepository";
import {sendEmail} from "../Services/MailService";
import bcrypt from "bcrypt";
import {AppRequest} from "../Middleware/auth";



   export const login  = async   (req: Request, res : Response) : Promise<Response> => {
      const {email, password} = req.body;

      if (!validate(email) || !validate(password))
      {
         return res.status(400).json({
            message: "Both username and password are required"
         });
      }
      try {
         const userRepository  = getCustomRepository(UserRepository);
         const user = await userRepository.findByEmail(email);

         if (user)
         {
            if (!user.verified)
            {
               return res.status(403).json({
                  message: "This account is not verified yet. Please checkout your email inbox and verify the email"
               });
            }
            const passwordMatch  = bcrypt.compareSync(password, user.password);

            if (!passwordMatch)
            {
               return res.status(403).json({
                  message: "Incorrect password, please try again"
               });
            }

            const token  = generateToken(user);
            return res.status(200).json({
               ...user,
               token
            });
         }
         else {
            return res.status(400).json({
               message: "User with that email not found"
            });
         }
      }
      catch (e) {
         return res.status(500).json({
            message: "Something went wrong while logging you in. try again later"
         });
      }
   }

    export const register = async (req: Request, res : Response) : Promise<Response> => {
      const {username,email,password} = req.body;

      if (!validate(email) || !validate(password) || !validate(username))
      {
         return res.status(400).json({
            message: "All username, email and password are required"
         });
      }

      try {
         const userRepository  = getCustomRepository(UserRepository);
         const user  = await userRepository.createUser(username,email,password);
         const token =  generateToken(user);
         await sendEmail(user, token);
         return res.status(201).json({
            message: `Please click on the link that hs been sent to ${user.email} to verify your email and complete registration.`});
      }
      catch (e) {
         return res.status(500).json({
            message: "Something went wrong while registering a new user"
         });
      }
   }


   export const verifyEmail = (req : Request, res : Response) => {
      const {token}  = req.params;
      const user  = validateToken(token);
      if (user) {
         return res.status(200).json({
            message: "your email is verified,please enjoy our services"
         });
      }
      else {
         return res.status(403).json({
            message: "Invalid or expired token provided. Please try registering again"
         });
      }
   }

   export const  getCurrentUser = (req : AppRequest,res :Response )=>{
      return res.status(200).json(req.user);
   }
