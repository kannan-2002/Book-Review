const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get book by ID
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// Add new book (admin only)
router.post("/", async (req, res) => {
  const { title, author, coverImage, description } = req.body;
  const newBook = new Book({ title, author, coverImage, description });
  await newBook.save();
  res.json(newBook);
});

module.exports = router;
