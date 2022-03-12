import {Request, Response} from "express";
import {validate} from "../utils/Validations";
import {generateToken} from "../Services/TokenService";
import {getCustomRepository} from "typeorm";
import {UserRepository} from "../Repositories/UserRepository";


   const userRepository  = getCustomRepository(UserRepository);

   const login  = async   (req: Request, res : Response) : Promise<Response> => {
      const {email, password} = req.body;

      if (!validate(email) || !validate(password))
      {
         return res.status(400).json({
            message: "Both username and password are required"
         });
      }

      try {
         const user = await userRepository.findByEmail(email);

         if (user)
         {
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

    const register = async (req: Request, res : Response) : Promise<Response> => {
      const {username,email,password} = req.body;

      if (!validate(email) || !validate(password) || !validate(username))
      {
         return res.status(400).json({
            message: "All username, email and password are required"
         });
      }

      try {
         const user  = await userRepository.createUser(username,email,password);
         return res.status(201).json(user);
      }
      catch (e) {
         return res.status(500).json({
            message: "Something went wrong while registering a new user"
         });
      }

   }



export {login,register};