import { app } from "./app.js";
import { dbConnect } from "./data/database.js";



dbConnect();
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log("server is working");
});