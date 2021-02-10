const Book = require('../models/Book');

exports.getAll = (req, res) => {
    Book.find({}, (err, books) => {
        const booksArr = [];

        books.forEach(book => booksArr.push(book));

        res.send(books);
    });
}

exports.addBook = (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        reserved: false,
        borrowed: false,
    });

    book.save((err, book) => {
        if (err) {
            res.status(500).send({ message: err })
        }

        res.send({ message: `${book.name} was added successfully!` });
    });
}