import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const ReviewForm = ({ bookId }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    fetchReviewCount();
  }, []);

  const fetchReviewCount = () => {
    axios
      .get(`http://localhost:5000/reviews/${bookId}/count`)
      .then((response) => {
        setReviewCount(response.data.count);
      })
      .catch((error) => console.error("Error fetching review count:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/reviews", {
        bookId,
        rating,
        comment,
      })
      .then(() => {
        alert("Review submitted!");
        setRating("");
        setComment("");
        fetchReviewCount(); // Refresh review count after submission
      })
      .catch((error) => console.error("Error submitting review:", error));
  };

  return (
    <div>
      <h2>✍️ Submit a Review</h2>
      <p>📢 Total Reviews: {reviewCount}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="⭐ Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <textarea
          placeholder="💬 Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
