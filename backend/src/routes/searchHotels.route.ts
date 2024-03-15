import express from "express";
import { searchHotel } from "../controllers/searchHotels.controller";

const router = express.Router();

router.get("/search", searchHotel);

export default router;
