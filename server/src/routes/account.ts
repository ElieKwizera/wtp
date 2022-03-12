import express from "express";
import {login, register} from "../Controllers/AccountController";

const router = express.Router();


router.post("/login", register);
router.post("/register", login);

export default router;