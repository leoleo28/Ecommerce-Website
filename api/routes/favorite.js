import express from "express";
import {
  updateFav,
  deleteFav,
  getFav,
  getFavs,
} from "../controllers/favorite.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//UPDATE
router.put("/", [verifyToken], updateFav);

//DELETE
router.delete("/:id", [verifyToken, verifyAdmin], deleteFav);

//GET
router.get("/find", [verifyToken], getFav);

//GET ALL
router.get("/", [verifyToken, verifyAdmin], getFavs);

export default router;
