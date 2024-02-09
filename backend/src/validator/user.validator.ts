import { check } from "express-validator";

export const userRegisterValidator = [
  check("firstName", "First name is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("email", "Email is required").isEmail(),
  check(
    "password",
    "Password is required & with 6 or more characters"
  ).isLength({
    min: 6,
  }),
];

export const userLoginValidator = [
  check("email", "Email is required").isEmail(),
  check(
    "password",
    "Password is required & with 6 or more characters"
  ).isLength({
    min: 6,
  }),
];
