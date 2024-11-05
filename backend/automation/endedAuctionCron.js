import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { calculateCommission } from "../controllers/commissionController.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    console.log("endedAuctionCron running", now);
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });

    for (const auction of endedAuctions) {
      try {
        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;
        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });

        const auctioneer = await User.findById(auction.createdBy);
        auctioneer.unpaidCommission = commissionAmount;

        if (highestBidder) {
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();

          const bidder = await User.findById(highestBidder.bidder.id);

          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBidder.amount,
                auctionsWon: 1,
              },
            },
            {
              new: true,
            }
          );

          await User.findByIdAndUpdate(
            auctioneer._id,
            {
              $inc: {
                unpaidCommission: commissionAmount,
              },
            },
            {
              new: true,
            }
          );

          const subject = `congratulation you won the auction ${auction.title}`;
          const message = `pay money to the auctioneer`;
          console.log("sending mail to highest bidder");
          sendEmail({ email: "himanshu9246@gmail.com", subject, message });
          console.log("successfully sent email to highest bidder");
        } else {
          await auction.save();
        }
      } catch (error) {
        console.error(error || "some error in ended auction cron");
      }
    }
  });
};
