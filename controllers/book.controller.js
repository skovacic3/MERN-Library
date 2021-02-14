const Book = require('../models/Book');

exports.getAll = (req, res) => {
    Book.find({}, (err, books) => {
        res.send(books);
    });
}

exports.getBook = (req, res) => {
    const book = Book.findOne({_id: req.params.id}).exec();
    return book;
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

exports.editBook = (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
    });

    Book.findOneAndUpdate({_id: req.params.id}, book, err => {
        if (err) res.status(500).send({message: err});
        res.send({ message: `${book.name} was added edited!` });
    })
}

exports.reserveBook = (req, res) => {
    Book.findOneAndUpdate({_id: req.params.id}, {reserved: true}, err => {
        if (err) res.status(500).send({message: err});
        res.send({ message: `Reservation was done!` });
    })
}

exports.unreserveBook = (req, res) => {
    Book.findOneAndUpdate({_id: req.params.id}, {reserved: false}, err => {
        if (err) res.status(500).send({message: err});
        res.send({ message: `Reservation was done!` });
    })
}

exports.deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, docs) => {
        if(err) res.status(500).send({message: err})
        res.send({message: 'Book deleted'});
    })
}