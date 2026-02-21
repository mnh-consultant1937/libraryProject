const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { isAuthenticated, isAdmin } = require('../middleware/auth');   

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('books/bookIndex', { title: 'All Books', books });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET create form
router.get('/new', isAdmin, (req, res) => {
  res.render('books/new', { title: 'Add New Book' });
});

// POST create book
router.post('/', isAdmin, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.redirect('/books');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// GET book details
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.render('books/show', { title: book.title, book });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET edit form
router.get('/:id/edit', isAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('books/edit', { title: 'Edit Book', book });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST update book
router.post('/:id', isAdmin, async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// GET delete book
router.get('/:id/delete', isAdmin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;




