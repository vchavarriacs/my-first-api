const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection details
const uri = 'mongodb://localhost:27017'; // Local MongoDB (or replace with Atlas URI)
const client = new MongoClient(uri);
const dbName = 'bookstore';
const collectionName = 'books';

// Connect to MongoDB and start the server
async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // GET endpoint: Fetch all books
        app.get('/books', async (req, res) => {
            const books = await collection.find({}).toArray();
            res.json(books);
        });

        // POST endpoint: Add a new book
        app.post('/books', async (req, res) => {
            const newBook = {
                id: Date.now(), // Unique ID using timestamp
                title: req.body.title,
                author: req.body.author
            };
            await collection.insertOne(newBook);
            res.status(201).json(newBook);
        });

        // Start the server
        app.listen(3000, () => {
            console.log('API is running on http://localhost:3000');
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
}

startServer();