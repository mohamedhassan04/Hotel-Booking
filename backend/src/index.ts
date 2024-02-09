import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import log from "./utils/logger";
import connection from "./config/dbConfig";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";

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

app.listen(port, () => {
  log.info(`Server started on port ${port}`);
});
