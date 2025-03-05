const express = require("express");
const Review = require("../models/Review"); // Import the Review model
const router = express.Router();

// Submit a new review (without userId)
router.post("/", async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    if (!bookId || !rating || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = new Review({ bookId, rating, comment });
    await newReview.save();

    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get the number of reviews for a book
router.get("/:bookId/count", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const reviewCount = await Review.countDocuments({ bookId });
    res.json({ count: reviewCount });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
