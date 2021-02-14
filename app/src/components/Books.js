import React, {useEffect, useState} from 'react';
import bookService from "../services/book.service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import NewBookModal from "./NewBookModal";
import EditBookModal from "./EditBookModal";
import reservationService from "../services/reservation.service";

const Books = props => {
    const [books, setBooks] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(0);
    const [nameFilter, setNameFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [reservedFilter, setReservedFilter] = useState(false);

    const getBooks = () => {
        bookService.getAllBooks().then(r => {
            setBooks(r);
        })
    }

    const handleDelete = id => {
        bookService.deleteBook(id).then(() => getBooks());
    }

    const handleReservation = id => {
        bookService.reserveBook(id).then();
        reservationService.addReservation(id, currentUser.id).then(() => getBooks());
    }

    useEffect(() => {
        getBooks();
        AuthService.getCurrentUser().then(user => {
            setCurrentUser(user)
        })
    }, [])

    useEffect(() => {
        bookService.getAllBooks().then(r => {
            setBooks(r);
            console.log(r[0].author);
        })
    }, [showModal])
    return (
        <div>
            <h1>Books</h1>
            {currentUser && currentUser.admin && <Button variant="primary" onClick={() => setShowModal(true)}>Add new book</Button>}
            <NewBookModal show={showModal} onHide={() => setShowModal(false)} />
            <input onChange={e => setNameFilter(e.target.value)} placeholder={"Book name"} /> <br/>
            <input style={{marginTop: '1rem'}} onChange={e => setAuthorFilter(e.target.value)} placeholder={"Author name"} />
            <div className="d-flex flex-wrap justify-content-center">
                {books
                    .filter(book => book.name.toLowerCase().includes(nameFilter.toLowerCase()) && book.author.toLowerCase().includes(authorFilter.toLowerCase()))
                    .map(book => (
                <Card key={book._id} style={{ width: '18rem', margin: '2rem' }}>
                <EditBookModal id={book._id} name={book.name} author={book.author} description={book.description} show={id !== 0} onHide={() => setId(0)} />
                <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Subtitle style={{marginBottom: '1rem'}}>{book.author}</Card.Subtitle>
                    <Card.Text>{book.description}</Card.Text>
                    {currentUser && currentUser.admin
                        ? (
                            <div>
                                <Button variant="primary">Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(book._id)}>Delete</Button>
                            </div>
                        )
                        : <Button disabled={book.reserved || book.borrowed} style={{marginTop: 'auto'}} variant="primary" onClick={() => handleReservation(book._id)}>Reserve</Button>}
                    </Card.Body>
                </Card>
            ))}
            </div>
        </div>
    );
};

export default Books;