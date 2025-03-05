import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css"; // Import global styles

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => setBooks(response.data.slice(0, 4)))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        📚 Featured Books
      </h1>
      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img src={book.coverImage} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <Link to={`/books/${book._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
