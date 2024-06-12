import express from "express";
import { getRatings, addRating } from "../controllers/ratingController";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/books/:bookId/ratings", getRatings);
router.post("/books/:bookId/ratings", authenticate, addRating);

export default router;
