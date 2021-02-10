const Reservation = require('../models/Reservation');

exports.getAll = (req, res) => {
    Reservation.find({}, (err, reservations) => {
        res.send(reservations);
    });
}

exports.addReservation = (req, res) => {
    const reservation = new Reservation({
        bookId: req.body.bookId,
        userId: req.body.userId,
        date: new Date().toLocaleDateString().slice(0, 10),
    });

    reservation.save((err, reservation) => {
        if (err) {
            res.status(500).send({ message: err })
        }

        res.send({ message: `Reservation was added successfully!` });
    });
}

exports.deleteReservation = (req, res) => {
    Reservation.findByIdAndDelete(req.params.id, (err, docs) => {
        if(err) res.status(500).send({message: err})
        res.send({message: 'Reservation deleted'});
    })
}