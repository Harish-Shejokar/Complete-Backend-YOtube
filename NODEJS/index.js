import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// connecting mongodb to our app
mongoose
  .connect("mongodb+srv://garry:0000000000@cluster0.q3gng0d.mongodb.net/", {
    dbname: "Backend",
  })
  .then(() => console.log("data base connected"))
  .catch((err) => console.log(err));

//create a schema
const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//then create a  model or collection
const users = new mongoose.model("Users", usersSchema);

const app = express();

app.use(express.static(path.join(path.resolve(), "Public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(req);
  if (token) {
    const decoded = jwt.verify(token, "sjdfkjasdkfjfksdjfwieo");
    req.thisUser = await users.findById(decoded._id);
    next();
  } else {
    res.render("login.ejs");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  let { name } = req.thisUser;
  res.render("logout.ejs", { name });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "null", {
    httpOnly: "true",
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await users.findOne({ email });

  if (existingUser) {
    console.log("existing user")
    return res.render("login.ejs",{email,password});
  } 
  const hashPassword = await bcrypt.hash(password, 10);
    const oneUser = await users.create({
      name,
      email,
      password : hashPassword
    });
    const token = jwt.sign({ _id: oneUser._id }, "sjdfkjasdkfjfksdjfwieo");
    // console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      // expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/");
  
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    res.redirect("/");
  } else {
    res.redirect("/register");
  }
});

app.get("/register", (req, res) => {
  // console.log(">>>>>>>>>register html");
  res.render("register.ejs");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const existingUser = await users.findOne({ email });

  if (!existingUser) return res.redirect("/register");
  

    const isMatch = await bcrypt.compare(password,existingUser.password);

    if (!isMatch) {
     return res.render("login.ejs",{message:"Incorrect Password"})

    } 

    const token = await jwt.sign(
      { _id: existingUser._id },
      "sjdfkjasdkfjfksdjfwieo"
    );
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.redirect("/");
   
});

app.listen(5000, () => {
  console.log("server is working with express");
});
