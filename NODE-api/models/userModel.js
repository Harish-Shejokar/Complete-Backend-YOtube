import mongoose from "mongoose";


const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const users = new mongoose.model("Users", Schema);
//-----------------------------------------------------------------------------------------------
