import cron from "node-cron";
import { PaymentProof } from "../models/commissionProofSchema.js";
import { User } from "../models/userSchema.js";
import { Commission } from "../models/commissionSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("verifyCommission cron is running");
    const approvedProofs = await PaymentProof.find({ status: "Approved" });
    for (const proof of approvedProofs) {
      try {
        const user = await User.findById(proof.userId);
        let updatedUserData = {};

        if (user) {
          if (user.unpaidCommission >= proof.amount) {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                $inc: {
                  unpaidCommission: -proof.amount,
                },
              },
              {
                new: true,
              }
            );

            await PaymentProof.findByIdAndUpdate(proof._id, {
              status: "Settled",
            });
          } else {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                unpaidCommission: 0,
              },
              {
                new: true,
              }
            );

            await PaymentProof.findByIdAndUpdate(proof._id, {
              status: "Settled",
            });
          }
          await Commission.create({
            amount: proof.amount,
            user: user._id,
          });

          const settlementDate = new Date(Date.now()).toString().substring(0, 15);

          const subject =
            "your payment has been successfully verified and settled";
          const message = "your payment verified";

          sendEmail({ email: "himanshu9246@gmail.com", subject, message });

          console.log(
            `user ${proof.userId} paid commission of ${proof.amount}`
          );
        }
      } catch (error) {
        console.log(
          `Error processing commission proof of user ${proof.userId} : ${error.message}`
        );
      }
    }
  });
};
