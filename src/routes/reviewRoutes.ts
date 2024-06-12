import express from "express";
import {
  getReviewsForBook,
  addReviewForBook,
  deleteReviewById,
} from "../controllers/reviewController";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/books/:bookId/reviews", getReviewsForBook);
router.post("/books/:bookId/reviews", authenticate, addReviewForBook);
router.delete("/reviews/:id", authenticate, deleteReviewById);

export default router;
