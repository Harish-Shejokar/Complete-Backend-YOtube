import express from "express";
import { deleteParticularUser, getAllUsers, getParticularUser, registerNewUser, updateParticularUser } from "../Controllers/users.js";

const router = express.Router();


router.get("/all", getAllUsers);

router.post("/new", registerNewUser);

// always put dynamic routes at bottom and put static route at top
// router.get("/userId/:id", getParticularUser);
// router.put("/userId/:id", updateParticularUser);
// router.delete("/userId/:id", deleteParticularUser);

router.route("/userId/:id").get(getParticularUser).put(updateParticularUser).delete(deleteParticularUser);


export default router;