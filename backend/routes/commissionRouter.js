import express from "express";
import { isAuth, isAuthorized } from "../middlewares/auth.js";
import { proofOfCommission } from "../controllers/commissionController.js";

const router = express.Router();

router.post("/proof", isAuth, isAuthorized("Auctioneer"), proofOfCommission);

export default router;
