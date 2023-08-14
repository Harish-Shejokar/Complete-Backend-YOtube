import { users } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const allUsers = await users.find();
  //   console.log(allUsers);
  res.json({
    sucess: true,
    users: allUsers,
  });
};

export const registerNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await users.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("temp", "some-value").json({
    sucess: true,
    users: newUser,
  });
};

export const getParticularUser = async (req, res) => {
  const { id } = req.params;
  //  console.log(req.query);
  //  console.log("params >> "+ req.params);
  const particulareUser = await users.findById(id);
  res.json({
    sucess: true,
    particulareUser,
  });
};


export const updateParticularUser = async (req, res) => {
  const { id } = req.params;
  //  console.log(req.query);
  //  console.log("params >> "+ req.params);
  const particulareUser = await users.findById(id);
  res.json({
    sucess: true,
    message:"update sucessfull",
  });
};


export const deleteParticularUser = async (req, res) => {
  const { id } = req.params;
  //  console.log(req.query);
  //  console.log("params >> "+ req.params);
  const particulareUser = await users.findById(id);
  res.json({
    sucess: true,
    message: "delete sucessfull",
  });
};


