import mongoose from "mongoose";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auctionSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";

export const addNewAuctionItem = async (req, res, next) => {
  // Check if the image file exists
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Auction Item Image is required" });
  }

  const { image } = req.files;

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(image.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }

  const {
    title,
    description,
    category,
    condition,
    startingBid,
    startTime,
    endTime,
  } = req.body;

  // Check if all required fields are present
  if (
    !title ||
    !description ||
    !category ||
    !startTime ||
    !endTime ||
    !startingBid
  ) {
    return next(new ErrorHandler("Please provide all the details", 400));
  }

  // Validate startTime and endTime
  if (new Date(startTime) < Date.now()) {
    return next(
      new ErrorHandler(
        "Auction starting time must be greater than present time",
        400
      )
    );
  }

  if (new Date(startTime) >= new Date(endTime)) {
    return next(
      new ErrorHandler("Auction starting time must be less than end time", 400)
    );
  }

  // Check if the user already has one active auction
  const alreadyOneAuctionActive = await Auction.find({
    createdBy: req.user._id,
    endTime: { $gt: Date.now() },
  });

  if (alreadyOneAuctionActive.length > 0) {
    return next(new ErrorHandler("You already have one active auction", 400));
  }
  try {
    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      image.tempFilePath,
      {
        folder: "AUCTION_PLATFORM_AUCTIONS",
      }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary error:",
        cloudinaryResponse.error || "Unknown Cloudinary error."
      );
      return next(
        new ErrorHandler("Failed to upload auction image to Cloudinary.", 500)
      );
    }

    // Create the auction item
    const auctionItem = await Auction.create({
      title,
      description,
      category,
      condition,
      startingBid,
      startTime,
      endTime,
      image: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: `Auction item created and will be listed on the auction page at ${startTime}`,
      auctionItem,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message || "Failed to create the auction", 500)
    );
  }
};

export const getAllItems = async (req, res, next) => {
  try {
    // Attempt to retrieve all auction items from the database
    const items = await Auction.find();

    // Send successful response
    return res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error retrieving auction items:", error);

    // Pass the error to the next middleware or error handler
    return next(new ErrorHandler("Failed to retrieve auction items.", 500));
  }
};

export const getMyAuctionItems = async (req, res, next) => {
  const userId = req.user._id;

  const items = await Auction.find({ createdBy: userId });

  res.status(200).json({
    success: true,
    items,
  });
};

export const getAuctionDetails = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format"), 400);
  }

  const auctionItem = await Auction.findById(id);

  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found", 404));
  }

  const bidders = auctionItem.bids.sort((a, b) => b.amount - a.amount);

  res.status(200).json({
    success: true,
    auctionItem,
    bidders,
  });
};

export const removeFromAuction = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format"), 400);
  }

  const auctionItem = await Auction.findById(id);

  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found", 404));
  }

  await auctionItem.deleteOne();

  res.status(200).json({
    success: true,
    message: "Auction item deleted successfully",
  });
};

export const republishItem = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format"), 400);
  }

  let auctionItem = await Auction.findById(id);

  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found", 404));
  }

  if (!req.body.startTime || !req.body.endTime) {
    return next(new ErrorHandler("startTime and EndTime is mandatory", 400));
  }

  if (new Date(auctionItem.endTime) > Date.now()) {
    return next("auction is already running cannot republish", 400);
  }
  const data = {
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
  };

  if (data.startTime < Date.now()) {
    return next(
      new ErrorHandler(
        "Auction starting time must be greater than the present time",
        400
      )
    );
  }

  if (data.startTime >= data.endTime) {
    return next(
      new ErrorHandler(
        "Auction starting time must be less than the present time",
        400
      )
    );
  }

  if (auctionItem.highestBidder) {
    const highestBidder = await User.findById(auctionItem.highestBidder);
    highestBidder.moneySpent -= auctionItem.currentBid;
    highestBidder.auctionsWon -= 1;
    highestBidder.save();
  }

  data.bids = [];
  data.commissionCalculated = false;
  data.currentBid = 0;
  data.highestBidder = null;

  auctionItem = await Auction.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await Bid.deleteMany({ auctionItem: auctionItem._id });

  const createdBy = await User.findByIdAndUpdate(
    req.user._id,
    { unpaidCommission: 0 },
    { new: true, runValidators: false, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    auctionItem,
    message: `Auction republished and will be active on ${req.body.startTime}`,
  });
};
