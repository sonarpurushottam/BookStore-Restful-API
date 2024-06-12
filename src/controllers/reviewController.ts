import { Request, Response } from "express";
import Review from "../models/review";
import Book from "../models/book";
import User from "../models/user";

const getReviewsForBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { bookId: Number(bookId) },
      include: [User],
    });
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const addReviewForBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { content } = req.body;
  try {
    const newReview = await Review.create({
      userId: req.user!.id,
      bookId: Number(bookId),
      content,
    });
    res.status(201).json(newReview);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (
      !review ||
      (review.userId !== req.user!.id && req.user!.role !== "admin")
    ) {
      return res.status(404).json({ error: "Review not found" });
    }
    await review.destroy();
    res.json({ message: "Review deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { getReviewsForBook, addReviewForBook, deleteReviewById };
