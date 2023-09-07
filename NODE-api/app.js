import express, { urlencoded } from "express";
import userRouter from "./Routes/users.js";
import taskRouter from "./Routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/ErrorHandler.js";
import cors from "cors";

export const app = express();

config({
  path:"./data/config.env",
})

//middleware to get json data from postman
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "PUT", "POST", "DELETE"],
    credentials:true,
}))

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);


app.get("/", (req, res) => {
  // console.log(req.cookies)
  // console.log(req.query);

  res.send("nice ");
});

//error handler
app.use(errorMiddleware);

