import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import favoriteRoute from "./routes/favorite.js";
import cartRoute from "./routes/cart.js";
import stripeRoute from "./routes/stripe.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connect to db");
  } catch (error) {
    throw error;
  }
};

app.use(
  cors({
    origin: "*",
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/carts", cartRoute);
app.use("/api/checkout", stripeRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
