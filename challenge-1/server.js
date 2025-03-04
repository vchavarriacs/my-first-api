const express = require('express');
const app = express();
const books = require('./books.json'); // Load your "database"

// Define an API endpoint (like a menu item customers can order)
app.get('/books', (req, res) => {
    res.json(books); // Send the book list back
});

// Start the server (open the restaurant)
app.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});