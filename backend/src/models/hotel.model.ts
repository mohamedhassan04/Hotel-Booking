import mongoose from "mongoose";
import { hotelType } from "../types/hotel.type";

const hotelSchema = new mongoose.Schema<hotelType>({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childrenCount: {
    type: Number,
    required: true,
  },
  facilities: [
    {
      type: String,
      required: true,
    },
  ],
  pricePerNight: {
    type: Number,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const Hotel = mongoose.model<hotelType>("Hotel", hotelSchema);
export default Hotel;
