import express from "express";
import { isAuth, isAuthorized } from "../middlewares/auth.js";
import { placeBid } from "../controllers/bidController.js";
import { checkAuctionEndTime } from "../middlewares/checkAuctionEndTime.js";

const router = express.Router();

router.post("/place/:id", isAuth, isAuthorized("Bidder"),checkAuctionEndTime, placeBid);

export default router;
