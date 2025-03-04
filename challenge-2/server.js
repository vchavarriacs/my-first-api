const express = require('express');
const fs = require('fs'); // For file operations
const app = express();
const books = require('./books.json');

// Middleware to parse JSON request bodies
app.use(express.json());

// GET endpoint (from Challenge 1)
app.get('/books', (req, res) => {
    res.json(books);
});

// POST endpoint to add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1, // Simple ID increment
        title: req.body.title,
        author: req.body.author
    };

    // Add the new book to the array
    books.push(newBook);

    // Write updated array back to books.json
    fs.writeFile('./books.json', JSON.stringify(books, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving book' });
        }
        res.status(201).json(newBook); // 201 = Created
    });
});

// Start the server
app.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});