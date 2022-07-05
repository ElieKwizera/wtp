import express, {response} from "express";
import { RegisterBusPark, RetrieveBusPark } from "../Controllers/BusParkController"; 

const router = express.Router();

router.route("/")
    .post(RegisterBusPark)
    .get(RetrieveBusPark);


export default router;