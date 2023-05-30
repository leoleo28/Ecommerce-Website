import express from "express";
import {
  updateCart,
  deleteCart,
  getCart,
  getCarts,
  checkoutCart,
} from "../controllers/cart.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//UPDATE
router.put("/", [verifyToken], updateCart);

//UPDATE
router.put("/checkout", [verifyToken], checkoutCart);

//DELETE
router.delete("/:id", [verifyToken, verifyAdmin], deleteCart);

//GET
router.get("/find", [verifyToken], getCart);

//GET ALL
router.get("/", [verifyToken, verifyAdmin], getCarts);

export default router;
