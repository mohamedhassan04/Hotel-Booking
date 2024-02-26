import express from "express";
import {
  addHotel,
  getHotelDetails,
  getOneHotelById,
  updateMyHotel,
} from "../controllers/hotels.controller";
import { upload } from "../utils/multer";
import verifyToken from "../middleware/verify-token";
import { hotelValidator } from "../validator/hotel.validator";

const router = express.Router();

router.post(
  "/add-hotel",
  verifyToken,
  upload.array("imageFiles", 6),
  hotelValidator,
  addHotel
);

router.get("/get-hotel", verifyToken, getHotelDetails);
router.get("/get-one-hotel/:id", verifyToken, getOneHotelById);

router.put(
  "/update-hotel/:id",
  verifyToken,
  upload.array("imageFiles", 6),
  updateMyHotel
);

export default router;
