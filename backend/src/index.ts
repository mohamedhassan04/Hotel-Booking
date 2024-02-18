import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import log from "./utils/logger";
import connection from "./config/dbConfig";
import userRouter from "./routes/user.route";
import hotelRouter from "./routes/hotels.route";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.SERVER_PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
connection;

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({
    message: "Hello from express endpoint",
  });
});

app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);

app.listen(port, () => {
  log.info(`Server started on port ${port}`);
});
