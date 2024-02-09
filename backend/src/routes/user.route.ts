import express from "express";
import {
  logOut,
  login,
  register,
  validateToken,
} from "../controllers/user.controller";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validator/user.validator";
import verifyToken from "../middleware/verify-token";

const router = express.Router();

router.post("/register", userRegisterValidator, register);
router.post("/login", userLoginValidator, login);
router.get("/validate-token", verifyToken, validateToken);
router.post("/logout", logOut);

export default router;
