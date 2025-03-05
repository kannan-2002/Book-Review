import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>📖 All Books</h1>
      <input
        type="text"
        placeholder="🔍 Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ display: "block", margin: "10px auto", width: "50%" }}
      />
      <div className="book-list">
        {books
          .filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((book) => (
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

export default BookList;
