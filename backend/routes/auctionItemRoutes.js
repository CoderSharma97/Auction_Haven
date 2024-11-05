import express from "express";
import { isAuth, isAuthorized } from "../middlewares/auth.js";
import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionItems,
  removeFromAuction,
  republishItem,
} from "../controllers/auctionItemController.js";
import { trackCommissionStatus } from "../middlewares/trackCommissionStatus.js";

const router = express.Router();

router.post(
  "/create",
  isAuth,
  isAuthorized("Auctioneer"),
  trackCommissionStatus,
  addNewAuctionItem
);
router.get("/allitems", getAllItems);
router.get("/auction/:id", getAuctionDetails);
router.get("/myitems", isAuth, isAuthorized("Auctioneer"), getMyAuctionItems);
router.delete(
  "/delete/:id",
  isAuth,
  isAuthorized("Auctioneer"),
  removeFromAuction
);
router.put(
  "/item/republish/:id",
  isAuth,
  isAuthorized("Auctioneer"),
  republishItem
);

export default router;
