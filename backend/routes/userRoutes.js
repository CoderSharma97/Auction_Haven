import express from "express";
import { fetchLeaderboard, getProfile, login, logout, register } from "../controllers/userController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me",isAuth,getProfile);
router.get("/logout",isAuth,logout);
router.get("/leaderboard",fetchLeaderboard);



export default router;