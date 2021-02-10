const mongoose = require("mongoose");

const Reservation = mongoose.model(
    "Reservation",
    new mongoose.Schema({
        bookId: String,
        userId: String,
        date: Date,
    })
);

module.exports = Reservation;