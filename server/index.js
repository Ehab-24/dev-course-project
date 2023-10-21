import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.js";
import verifyToken from "./middleware/verifyToken.js";

// configure environment variables
dotenv.config();

// create an express application
const app = express();
/**
 * Use json middleware for the whole server
 * This tells the express app to automatically use json parsing for request payloads and results
 */
app.use(express.json());
// setup cors
app.use(cors());

// define a hello world route
app.get("/", (_, res) => {
  res.status(200).json({ message: "Hello world\n" });
});

// bind the express app to `process.env.PORT` or `port 3000`
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// connect to mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

/**
 * mount all routes defined in `authRouter` to the main express app at path `/auth`
 * For example, to hit `/login` endpoint in `authRouter`, use http://localhost:3000/auth/login
 */
app.use("/auth", authRouter);
