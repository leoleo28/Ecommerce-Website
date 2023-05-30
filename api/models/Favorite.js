import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        productTitle: {
          type: String,
          required: true,
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

export default mongoose.model("Favorite", FavoriteSchema);
