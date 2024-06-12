import { Request, Response } from "express";
import Payment from "../models/payment";
import Book from "../models/book";
import { GoCardlessService } from "../services/goCardlessService";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { bookId, amount } = req.body;
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const userId = req.user?.id;
    const paymentResponse = await GoCardlessService.createPayment(amount);

    const payment = await Payment.create({
      id: generateUniqueId(), 
      createdAt: new Date(),
      userId,
      bookId,
      amount,
      status: paymentResponse.status,
    });

    res.status(201).json(payment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByPk(req.params.id, { include: [Book] });
    if (!payment) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(payment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
function generateUniqueId(): number {
  throw new Error("Function not implemented.");
}
