import dotenv from "dotenv";
dotenv.config();

import express from "express";

import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import authorRoutes from "./routes/authorRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import ratingRoutes from "./routes/ratingRoutes";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/reviews", reviewRoutes);
app.use("/ratings", ratingRoutes);
app.use("/payments", paymentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
