const mongoose = require("mongoose");

const Book = mongoose.model(
    "Book",
    new mongoose.Schema({
        name: String,
        author: String,
        description: String,
        reserved: Boolean,
        borrowed: Boolean,
    })
);

module.exports = Book;