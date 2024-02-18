import { body } from "express-validator";

export const hotelValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("adultCount")
    .notEmpty()
    .isNumeric()
    .withMessage("AdultCount is required"),
  body("childrenCount")
    .notEmpty()
    .isNumeric()
    .withMessage("ChildrenCount is required"),
  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price Per Night is required and must be a number"),
  body("starRating").notEmpty().withMessage("StarRating is required"),
];
