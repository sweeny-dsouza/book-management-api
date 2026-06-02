const express = require("express");

const app = express();

const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory books array
let books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("Books API is running!");
});

// GET all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// POST a new book
app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added successfully",
    book: newBook,
  });
});

// PUT update a book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.status(200).json({
    message: "Book updated successfully",
    book,
  });
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  const deletedBook = books.splice(bookIndex, 1);

  res.status(200).json({
    message: "Book deleted successfully",
    deletedBook,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});