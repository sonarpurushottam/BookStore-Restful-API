import { Request, Response } from "express";
import Book from "../models/book";
import Author from "../models/author";
import Review from "../models/review";
import sequelize from "../config/db";
import Rating from "../models/rating";

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({
      include: [{ model: Author, as: "authors" }],
    });

    const booksData = [];

    for (const book of books) {
      const reviews = await Review.findAll({
        where: { bookId: book.id },
        attributes: ["content"],
      });

      const reviewsContent = reviews.map((review) => review.content);

      const averageRatingResult = await Rating.findOne({
        attributes: [
          [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
        ],
        where: { bookId: book.id },
        raw: true,
      });

      const averageRating = averageRatingResult
        ? parseFloat(averageRatingResult.averageRating).toFixed(2)
        : null;

      const authorsDetails = book.authors.map(
        (author: {
          name: any;
          bio: any;
          birthdate: any;
          isSystemUser: any;
        }) => ({
          name: author.name,
          bio: author.bio,
          birthdate: author.birthdate,
          isSystemUser: author.isSystemUser,
        })
      );

      const bookData = {
        id: book.id,
        bookCode: book.bookCode,
        title: book.title,
        description: book.description,
        publishedYear: book.publishedYear,
        price: book.price,
        externalId: book.externalId,
        authors: authorsDetails,
        reviews: reviewsContent,
        averageRating,
      };

      booksData.push(bookData);
    }

    res.json(booksData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id, {
      include: [{ model: Author, as: "authors" }],
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const reviews = await Review.findAll({
      where: { bookId: book.id },
      attributes: ["content"],
    });

    const reviewsContent = reviews.map((review) => review.content);

    const averageRatingResult = await Rating.findOne({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
      ],
      where: { bookId: book.id },
      raw: true,
    });

    const averageRating = averageRatingResult
      ? parseFloat(averageRatingResult.averageRating).toFixed(2)
      : null;

    const authorsDetails = book.authors.map(
      (author: { name: any; bio: any; birthdate: any; isSystemUser: any }) => ({
        name: author.name,
        bio: author.bio,
        birthdate: author.birthdate,
        isSystemUser: author.isSystemUser,
      })
    );

    const response = {
      id: book.id,
      bookCode: book.bookCode,
      title: book.title,
      description: book.description,
      publishedYear: book.publishedYear,
      price: book.price,
      externalId: book.externalId,
      authors: authorsDetails,
      reviews: reviewsContent,
      averageRating,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req: Request, res: Response) => {
  const {
    bookCode,
    title,
    description,
    publishedYear,
    price,
    authors,
    externalId,
  } = req.body;
  try {
    const newBook = await Book.create({
      bookCode,
      title,
      description,
      publishedYear,
      price,
      externalId,
    } as any);
    if (authors && authors.length > 0) {
      await newBook.setAuthors(authors);
    }
    res.status(201).json(newBook);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    bookCode,
    title,
    description,
    publishedYear,
    price,
    authors,
    externalId,
  } = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    await book.update({
      bookCode,
      title,
      description,
      publishedYear,
      price,
      externalId,
    });
    if (authors && authors.length > 0) {
      await book.setAuthors(authors);
    }
    res.json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    await book.destroy();
    res.json({ message: "Book deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllBooks, getBookById, createBook, updateBookById, deleteBookById };
