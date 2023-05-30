import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "../controllers/product.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", [verifyToken, verifyAdmin], createProduct);

//UPDATE
router.put("/:id", [verifyToken, verifyAdmin], updateProduct);

//DELETE
router.delete("/:id", [verifyToken, verifyAdmin], deleteProduct);

//GET
router.get("/find/:id", getProduct);

//GET ALL
router.get("/", getProducts);

export default router;
