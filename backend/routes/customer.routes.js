import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

import {
  login,
  register,
  updateProfile,
  logout,
  getCustomer,
  getAllCustomers,
} from "../controllers/customer.controller.js";

const customerRouter = express.Router();

//auth routes-----------------------
customerRouter.post("/login", login);
customerRouter.post("/register", register);
customerRouter.patch("/update-profile", isAuthenticated, updateProfile);
customerRouter.post("/logout", isAuthenticated, logout);

//------------------------

customerRouter.get("/get-customer", isAuthenticated, getCustomer);
customerRouter.get("/get-all-customers", isAuthenticated, getAllCustomers);

export default customerRouter;
