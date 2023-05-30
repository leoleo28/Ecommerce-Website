import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        productTitle: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        productPrice: {
          type: Number,
          required: true,
        },
        productImg: { type: String, required: true },
        size: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
