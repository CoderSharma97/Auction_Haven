import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auctionSchema.js";
import { Bid } from "../models/bidSchema.js";
import { User } from "../models/userSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const auctionItem = await Auction.findById(id);

  if (!auctionItem) {
    return next(new ErrorHandler("Auction item not found", 404));
  }

  const { amount } = req.body;

  if (!amount) return next(new ErrorHandler("please place your bid", 404));

  if (amount <= auctionItem.currentBid) {
    return next(
      new ErrorHandler("Bid amount must be greater than the current bid", 404)
    );
  }

  if (amount < auctionItem.startingBid) {
    return next(
      new ErrorHandler("Bid amount must be greater than the starting bid", 404)
    );
  }

  try {
    const existingBid = await Bid.findOne({
      "bidder.id": req.user._id,
      auctionItem: auctionItem._id,
    });

    const existingBidInAuction = auctionItem.bids.find(
      (bid) => bid.userId.toString() === req.user._id.toString()
    );

    console.log(existingBid);
    console.log(existingBidInAuction);

    if (existingBid && existingBidInAuction) {
      existingBidInAuction.amount = amount;
      existingBid.amount = amount;
    //   await existingBidInAuction.save();
      await existingBid.save();
      auctionItem.currentBid = amount;
    } else {
      const bidderDetails = await User.findById(req.user._id);
      const bid = await Bid.create({
        amount,
        bidder: {
          id: bidderDetails._id,
          userName: bidderDetails.userName,
          profileImage: bidderDetails.profileImage?.url,
        },
        auctionItem: auctionItem._id,
      });
      auctionItem.bids.push({
        userId: req.user._id,
        userName: bidderDetails.userName,
        profileImage: bidderDetails.profileImage?.url,
        amount,
      });
      auctionItem.currentBid = amount;
    }

    await auctionItem.save();

    res.status(201).json({
      success: true,
      message: "bid placed",
      currentBid: auctionItem.currentBid,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "failed to place bid ", 500));
  }
});
