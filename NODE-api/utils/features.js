import jwt from "jsonwebtoken";

export const sendCookie = async (newUser, res, message, statusCode = 200) => {
  const token = await jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
  // console.log(process.env.NODE_ENV);
  // console.log(process.env.NODE_ENV === true);
  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Developmet" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Developmet" ? false : true,
    })
    .json({
      sucess: true,
      message,
    });
};
