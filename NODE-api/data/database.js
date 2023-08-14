import mongoose from "mongoose";

//connecting mongodb to backend by mongoose---------------------------------------
export const dbConnect =  () => {
    
mongoose
  .connect(process.env.MONGO_URI, {
    dbname: "backend-API",
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
}
