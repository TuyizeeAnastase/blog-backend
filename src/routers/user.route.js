import express from "express";
import userController from "../controllers/user.controller";
import {
  checkUserExist,
  checkUserRegistered,
} from "../middleware/user.middleware";
import {
  userValidation,
  loginValidation,
} from "../validations/user.validations";

const router = express();

router.post(
  "/register",
  userValidation,
  checkUserExist,
  userController.registerUSer
);

router.post(
  "/login",
  loginValidation,
  checkUserRegistered,
  userController.login
);

export default router;
