import express from "express";
import { isAuth, isAuthorized } from "../middlewares/auth.js";
import {
  deleteAuctionItem,
  deletePaymentProof,
  fetchAllUsers,
  getAllPaymentProofs,
  getPaymentProofDetails,
  monthlyRevenue,
  updateProofStatus,
} from "../controllers/superAdminController.js";

const router = express.Router();

router.delete(
  "/auctionitem/delete/:id",
  isAuth,
  isAuthorized("Super Admin"),
  deleteAuctionItem
);
router.get(
  "/paymentproofs/getall",
  isAuth,
  isAuthorized("Super Admin"),
  getAllPaymentProofs
);
router.get(
  "/paymentproof/:id",
  isAuth,
  isAuthorized("Super Admin"),
  getPaymentProofDetails
);
router.put(
  "/paymentproof/status/update/:id",
  isAuth,
  isAuthorized("Super Admin"),
  updateProofStatus
);
router.delete(
  "/paymentproof/delete/:id",
  isAuth,
  isAuthorized("Super Admin"),
  deletePaymentProof
);
router.get("/users/getall",isAuth,isAuthorized("Super Admin"),fetchAllUsers);
router.get("/monthlyincome",isAuth,isAuthorized("Super Admin"),monthlyRevenue);
export default router;
