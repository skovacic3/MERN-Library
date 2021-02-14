import React, {useEffect, useState} from 'react';
import AuthService from "../services/auth.service";
import userService from "../services/user.service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import reservationService from "../services/reservation.service";
import bookService from "../services/book.service";

const Admin = props => {
    const [admin, setAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [reservations, setReservations] = useState(undefined);
    const [show, setShow] = useState('users');

    const getUsers = () => {
        userService.getAllUsers().then(r => setUsers(r)).catch(e => console.log());
    }

    const getBooks = () => {
        bookService.getAllBooks().then(books => setBooks(books)).catch(e => console.log());
    }

    const getReservations = () => {
        reservationService.getAllReservations().then(r => setReservations(r)).catch(e => console.log());
    }

    const handleUserDelete = (id) => {
        userService.deleteUser(id).then(() => getUsers());
    }

    const handleReservationDelete = (reservation) => {
        bookService.unreserveBook(reservation.bookId).then();
        reservationService.deleteReservation(reservation._id).then(() => getReservations());
    }

    useEffect(() => {
        AuthService.isAdmin().then(r => setAdmin(r)).catch(e => console.log());
        getUsers();
        getReservations();
        getBooks();
    }, [])

    const UserList = (
        <div className="d-flex flex-wrap justify-content-center">
            {users.map(user => (
                <Card key={user._id} style={{ width: '18rem', margin: '2rem' }}>
                    <Card.Body>
                        <Card.Title>{'Username: ' + user.username}</Card.Title>
                        <Card.Subtitle style={{marginBottom: '1rem'}}>{user.admin ? 'Role: Admin': 'Role: User'}</Card.Subtitle>
                        <Card.Body>{'id: ' + user._id}</Card.Body>
                        <Button variant="danger" onClick={() => handleUserDelete(user._id)}>Delete</Button>
                    </Card.Body>
                </Card>))}
        </div>
    )

    const ReservationList = (
        <div className="d-flex flex-wrap justify-content-center">
            {reservations && reservations.length > 0 && books && books.length > 0 && reservations.map(reservation =>
                <Card key={reservation._id} style={{ width: '18rem', margin: '2rem' }}>
                    <Card.Title>{books.find(book => book._id === reservation.bookId).name}</Card.Title>
                    <Card.Subtitle style={{marginBottom: '1rem'}}>{books.find(book => book._id === reservation.bookId).author}</Card.Subtitle>
                    <Card.Text>{'Reserved: ' + reservation.date.slice(0,10) + ' by ' + users.find(user => user._id === reservation.userId).username}</Card.Text>
                    <Button variant="danger" onClick={() => handleReservationDelete(reservation)}>Delete</Button>
                </Card>)}
        </div>
    )


     return (
        <div>
            <select id="show" onChange={e => setShow(e.target.value)}>
                <option value="users">Users</option>
                <option value="reservations">Reservations</option>
            </select>
            {admin ? show === 'users' ? UserList : ReservationList : <p>Access denied</p>}
        </div>
    );
};

export default Admin;