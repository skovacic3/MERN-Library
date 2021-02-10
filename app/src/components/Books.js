import React, {useEffect, useState} from 'react';
import bookService from "../services/book.service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import NewBookModal from "./NewBookModal";
import EditBookModal from "./EditBookModal";

const Books = props => {
    const [books, setBooks] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(0);

    const getBooks = () => {
        bookService.getAllBooks().then(r => {
            setBooks(r);
        })
    }

    const handleDelete = id => {
        bookService.deleteBook(id).then(r => getBooks());
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
            <div className="d-flex justify-content-center">
                {books.map(book => (
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
                        : <Button style={{marginTop: 'auto'}} variant="primary">Reserve</Button>}
                    </Card.Body>
                </Card>
            ))}
            </div>
        </div>
    );
};

export default Books;