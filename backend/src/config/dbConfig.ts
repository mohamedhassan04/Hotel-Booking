import mongoose from "mongoose";
import log from "../utils/logger";

mongoose.connect(process.env.MONGO_URI as string);

const connection = mongoose.connection;

connection.on("connected", () => {
  log.info("Your database is connected successfully");
});

connection.on("error", (error) => {
  log.error("Error connection to database", error);
});
export default connection;
