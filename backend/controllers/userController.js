import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

export const register = async (req, res, next) => {
  // Check if files were uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Profile image is required." });
  }

  const { profileImage } = req.files;

  // Define allowed file formats
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  // Validate the file type
  if (!allowedFormats.includes(profileImage.mimetype)) {
    return next(new ErrorHandler("File format not supported.", 400));
  }

  // Destructure user data from request body
  const {
    userName,
    email,
    password,
    phone,
    address,
    role,
    bankAccountNumber,
    bankAccountName,
    bankName,
    razorpayAccountNumber,
    paypalEmail,
  } = req.body;

  // Check for required fields
  if (!userName || !email || !phone || !password || !address || !role) {
    return next(new ErrorHandler("Please fill in the full form.", 400));
  }

  // Additional checks for Auctioneer role
  if (role === "Auctioneer") {
    if (!bankAccountName || !bankAccountNumber || !bankName) {
      return next(new ErrorHandler("Please provide your bank details.", 400));
    }

    if (!razorpayAccountNumber) {
      return next(
        new ErrorHandler("Please provide your Razorpay account number.", 400)
      );
    }

    if (!paypalEmail) {
      return next(new ErrorHandler("Please provide your PayPal email.", 400));
    }
  }

  // Check if the user is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User is already registered.", 400));
  }

  // Upload the profile image to Cloudinary
  let cloudinaryResponse;
  try {
    cloudinaryResponse = await cloudinary.uploader.upload(
      profileImage.tempFilePath,
      {
        folder: "AUCTION_PLATFORM_USERS",
      }
    );
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return next(
      new ErrorHandler("Failed to upload profile image to Cloudinary.", 500)
    );
  }

  // Handle Cloudinary response errors
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown Cloudinary error."
    );
    return next(
      new ErrorHandler("Failed to upload profile image to Cloudinary.", 500)
    );
  }

  // Create the user
  const user = await User.create({
    userName,
    email,
    password,
    phone,
    address,
    role,
    profileImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber,
        bankAccountName,
        bankName,
      },
      razorpay: {
        razorpayAccountNumber,
      },
      paypal: {
        paypalEmail,
      },
    },
  });

  // Generate token and send response
  generateToken(user, "User is registered", 201, res);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please fill full form"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid credentials", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("invalid credentials", 400));
  }

  generateToken(user, "login successfully", 200, res);
};

export const getProfile = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, message: "logout successfully" });
};

export const fetchLeaderboard = async (req, res, next) => {
  const users = await User.find({ moneySpent: { $gt: 0 } });

  const leaderboard = users.sort((a, b) => b.moneySpent - a.moneySpent);

  res.status(200).json({
    success: true,
    leaderboard,
  });
};
