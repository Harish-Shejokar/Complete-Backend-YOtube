import jwt from "jsonwebtoken";
import { users } from "../models/userModel.js";

export const isAuthenticated = async(req, res , next) => {
     const { token } = req.cookies;
  
//   console.log(token);
  
  if (!token) {
    return res.json({
      sucess: "true",
      message: "login first",
    });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded._id);
  req.user = await users.findById(decoded._id );
  next();
}