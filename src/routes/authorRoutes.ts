import { Router } from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/autherController";
import { authenticate, isAdmin } from "../middlewares/auth";

const router = Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.post("/", authenticate, isAdmin, createAuthor);
router.put("/:id", authenticate, isAdmin, updateAuthor);
router.delete("/:id", authenticate, isAdmin, deleteAuthor);

export default router;
