import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

export const isAuth = async (req, res, next) => {
  // 1. Check if token exists in cookies
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("Authentication token is missing", 401)); // 401 for unauthorized
  }

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3. Find user by ID stored in the decoded token
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next(new ErrorHandler("User not found", 404)); // 404 if user not found
    }

    // 4. Proceed to the next middleware if everything is fine
    next();
  } catch (error) {
    // 5. Handle errors in token verification or user lookup
    return next(new ErrorHandler("Invalid token or authorization error", 403)); // 403 for forbidden
  }
};

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
