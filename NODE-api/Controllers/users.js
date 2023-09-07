import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import { users } from "../models/userModel.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";


export const registerNewUser = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      // return res.status(404).json({
      //   sucess: false,
      //   message: "Already existing User",
      // });
      next(new ErrorHandler("Already existing User", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });

    //token creating so that store it in cookie
    return sendCookie(newUser, res, `${name} registerd successfully`, 201);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res,next) => {
  const { email, password } = req.body;

  const existingUser = await users.findOne({ email }).select("+password");

  if (!existingUser) {
    // return res.status(404).json({
    //   sucess: false,
    //   message: "Invalid email or passoword ",
    // });
     return next(new ErrorHandler("Invalid email or passowordsdfjjs ", 400));
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    // return res.status(404).json({
    //   sucess: false,
    //   message: "Invalid email or passoword ",
    // });
    return next(new ErrorHandler("Invalid email or passowordsdfjjs", 400));
  }

  return sendCookie(
    existingUser,
    res,
    `Welcome back ${existingUser.name}`,
    200
  );
};

export const getMyProfile = (req, res) => {
  res.json({
    sucess: "true",
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Developmet" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Developmet" ? false : true,
    })
    .json({
      sucess: true,
      message: "logut successfull",
    });
};
