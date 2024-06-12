import { Request, Response } from "express";
import Author from "../models/author";
import Book from "../models/book";

const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const author = await Author.findByPk(id, { include: [Book] });
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createAuthor = async (req: Request, res: Response) => {
  const { name, bio, birthdate, isSystemUser } = req.body;
  try {
    const newAuthor = await Author.create({
      name,
      bio,
      birthdate,
      isSystemUser,
    });
    res.status(201).json(newAuthor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, bio, birthdate, isSystemUser } = req.body;
  try {
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    author.name = name || author.name;
    author.bio = bio || author.bio;
    author.birthdate = birthdate || author.birthdate;
    author.isSystemUser = isSystemUser ?? author.isSystemUser;
    await author.save();
    res.json(author);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    await author.destroy();
    res.json({ message: "Author deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
