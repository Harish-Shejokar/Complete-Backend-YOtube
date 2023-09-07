import express from "express";
import {
  getMyProfile,
  loginUser,
  logout,
  registerNewUser,
} from "../Controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


// router.get("/all", getAllUsers);

router.post("/new", registerNewUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);





export default router;