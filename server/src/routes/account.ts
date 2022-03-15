import express from "express";
import {getCurrentUser, login, register, verifyEmail} from "../Controllers/AccountController";

const router = express.Router();


router.post("/login", login);
router.post("/register", register);
router.post("/verify/:token", verifyEmail);
router.get("/current-user", getCurrentUser);

export default router;