import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import "../styles.css"; // ✅ Import CSS

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error("Error fetching book:", error));

    axios.get(`http://localhost:5000/reviews/${id}`)
      .then(response => setReviews(response.data))
      .catch(error => console.error("Error fetching reviews:", error));
  }, [id]);

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <img src={book.coverImage} alt={book.title} />
      <h3>Author: {book.author}</h3>
      <p>{book.description}</p>
      <h3>Rating: {book.rating}/5</h3>

      <div className="reviews">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review._id} className="review">
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <ReviewForm bookId={id} />
    </div>
  );
};

export default BookDetails;
