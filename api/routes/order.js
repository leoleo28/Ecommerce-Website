import express from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
} from "../controllers/order.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", [verifyToken], createOrder);

//UPDATE
router.put("/:id", [verifyToken], updateOrder);

//DELETE
router.delete("/:id", [verifyToken], deleteOrder);

//GET
router.get("/find", [verifyToken], getOrder);

//GET ALL
router.get("/", [verifyToken, verifyAdmin], getOrders);

export default router;
