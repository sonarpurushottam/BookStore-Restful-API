import { Request, Response } from "express";
import Rating from "../models/rating";

export const getRatings = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const ratings = await Rating.findAll({ where: { bookId } });
    res.json(ratings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addRating = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { rating } = req.body;
  try {
    const newRating = await Rating.create({
      userId: req.user!.id,
      bookId,
      rating,
    });
    res.status(201).json(newRating);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
