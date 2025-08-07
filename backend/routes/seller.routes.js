import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";

import {
  login,
  register,
  updateProfile,
  logout,
  getSeller,
  getAllSellers,
} from "../controllers/seller.controller.js";

const sellerRouter = express.Router();

// auth routes----------
sellerRouter.post("/login", login);
sellerRouter.post("/register", register);
sellerRouter.patch("/update-profile", isAuthenticated, updateProfile);
sellerRouter.post("/logout", logout);

//-----------------------------

customerRouter.get("/get-seller", isAuthenticated, getSeller);
customerRouter.get("/get-all-sellers", isAuthenticated, getAllSellers);

export default sellerRouter;
