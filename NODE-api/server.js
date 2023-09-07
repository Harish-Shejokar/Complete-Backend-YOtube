import { app } from "./app.js";
import { dbConnect } from "./data/database.js";




dbConnect();
// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`server is working at port -  ${process.env.PORT} and in ${process.env.NODE_ENV} mode`);
});

