import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} from "../controllers/bookController";
import { authenticate, isAdmin } from "../middlewares/auth";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", authenticate, isAdmin, createBook);
router.put("/:id", authenticate, isAdmin, updateBookById);
router.delete("/:id", authenticate, isAdmin, deleteBookById);

export default router;
