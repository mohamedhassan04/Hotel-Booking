import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import log from "../utils/logger";
import { validationResult } from "express-validator";

const register = expressAsyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    user = new User(req.body);
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    log.error(error);
  }
});

const login = expressAsyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordMatched = await user.matchPassword(password);

    if (!isPasswordMatched) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res
      .status(201)
      .json({ userId: user.id, message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    log.error(error);
  }
});

const validateToken = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
  }
);

const logOut = expressAsyncHandler(async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

const findFilerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body.query;
    try {
      let users = await User.find().select("-password");

      if (users && firstName != "") {
        users = users.filter((user) => user.firstName === firstName);
      } else if (users && lastName != "") {
        users = users.filter((user) => user.lastName === lastName);
      }

      res.status(200).json(users);
    } catch (error) {}
  }
);

export { register, login, validateToken, logOut, findFilerUser };
