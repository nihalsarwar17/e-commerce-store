import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config(); //fetch variables from the .env file

// connecting to mongodb, call MONGODB_URI object from .env
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to Mongo Database");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// mongodb API
app.use("/api/seed", seedRouter); // calls async function from seedRoutes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

// error handler (middleware) for express
// amy error occurred in expressAsync,
// will display from this code
app.use((err, req, res, next) => {
  // message coming from above err object
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
