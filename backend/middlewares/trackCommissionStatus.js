import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

export const trackCommissionStatus = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.unpaidCommission > 0) {
    return next(
      new ErrorHandler(
        "you have unpaid commission . please pay them before posting new auction",
        403
      )
    );
  }

  next();
});
