import React, {useEffect, useState} from 'react';
import reservationService from "../services/reservation.service";
import AuthService from "../services/auth.service";
import bookService from "../services/book.service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Reservations = props => {

    const [userId, setUserId] = useState();
    const [reservations, setReservations] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        AuthService.getCurrentUser().then(user => setUserId(user.id));
        userId && reservationService.getReservationsByUser(userId).then(reservations => setReservations(reservations));
        bookService.getAllBooks().then(books => setBooks(books));
    }, [userId])

    return (
        <div>
            <h2>My reservations</h2>
            <div className="d-flex flex-wrap justify-content-center">
                {reservations.map(reservation =>
                <Card key={reservation._id} style={{ width: '18rem', margin: '2rem' }}>
                    <Card.Title>{books.find(book => book._id === reservation.bookId).name}</Card.Title>
                    <Card.Subtitle style={{marginBottom: '1rem'}}>{books.find(book => book._id === reservation.bookId).author}</Card.Subtitle>
                    <Card.Text>{'Rezervirano: ' + reservation.date.slice(0,10)}</Card.Text>
                </Card>)}
            </div>
        </div>
    );
};

export default Reservations;