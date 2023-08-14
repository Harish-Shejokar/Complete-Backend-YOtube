import express from "express";
import userRouter from "./Routes/users.js";
import { config } from "dotenv";

export const app = express();

config({
  path:"./data/config.env",
})

//middleware to get json data from postman
app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  console.log(req.query);
  res.send("nice ");
});
