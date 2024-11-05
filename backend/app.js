import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Import cookie-parser
import fileUpload from "express-fileupload"; // Import express-fileupload
import { connection } from "./database/connection.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRoutes.js";
import auctionItemRouter from "./routes/auctionItemRoutes.js";
import bidRouter from "./routes/bidRoutes.js";
import commissionRouter from "./routes/commissionRouter.js";
import superAdminRouter from "./routes/superAdminRoutes.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";

const app = express();
dotenv.config();

// Load environment variables from the config file
//new comment
// Enable CORS with specific configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware for cookies, JSON, and form data
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fixed typo: exdeneded -> extended

// File upload configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);

// endedAuctionCron();
// verifyCommissionCron();
// Connect to the database
connection();
app.use(errorMiddleware);
export default app;
