import express from "express";
import { createOrder, getOrderById } from "../controllers/paymentController";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/orders", authenticate, createOrder);
router.get("/orders/:id", authenticate, getOrderById);

export default router;
