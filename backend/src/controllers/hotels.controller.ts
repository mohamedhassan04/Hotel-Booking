import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import log from "../utils/logger";
import { hotelType } from "../types/hotel.type";
import Hotel from "../models/hotel.model";
import { validationResult } from "express-validator";

const addHotel = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: hotelType = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    //1. upload the images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      // Convert the image buffer to base64 encoding
      const b64 = Buffer.from(image.buffer).toString("base64");
      // Create a data URI with the image mimetype and base64 data
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      // Upload the image to the cloudinary service using the v2 uploader
      const response = await cloudinary.v2.uploader.upload(dataURI);

      // Return the URL of the uploaded image
      return response.url;
    });

    //2. if upload was successful, add the image urls to the newHotel
    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    //3. save the new hotel in our database
    const hotelSaved = new Hotel(newHotel);
    await hotelSaved.save();
    // 4. return 201 status
    res.status(201).json(hotelSaved);
  } catch (error) {
    log.error("Error creating hotel:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export { addHotel };
