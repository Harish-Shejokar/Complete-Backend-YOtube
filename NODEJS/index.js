import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";

// connecting mongodb to our app
mongoose
  .connect(
    "mongodb+srv://garry:urytVgN43IUg8rNy@cluster0.q3gng0d.mongodb.net/",
    { dbname: "Backend" }
  )
  .then(() => console.log("data base connected"))
  .catch((err) => console.log(err));

//create a schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

//then create a  model or collection
const message = new mongoose.model("Message", messageSchema);

const app = express();

app.use(express.static(path.join(path.resolve(), "Public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  // console.log(req.cookies);
  if (token) {
    res.render("logout.ejs");
  } else {
    next();
  }
};

app.get("/", isAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "null", {
    httpOnly: "true",
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.post("/login", (req, res) => {
  res.cookie("token", "iamin", {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.post("/contact", async (req, res) => {
  // console.log(req.body);
  const { name, email } = req.body;
  await message.create({ name, email });
  // Users.push({ username: req.body.name, email: req.body.email });
  res.redirect("/success");
});

app.listen(5000, () => {
  console.log("server is working with express");
});
