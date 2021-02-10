import React, {useEffect, useState} from 'react';
import bookService from "../services/book.service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";

const Books = props => {
    const [books, setBooks] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        bookService.getAllBooks().then(r => {
            setBooks(r);
            console.log(r[0].author);
        })
        AuthService.getCurrentUser().then(user => {
            setCurrentUser(user)
        })
    }, [])
    return (
        <div>
            <h1>Books</h1>
            {currentUser && currentUser.admin && <Button variant="primary">Add new book</Button>}
            <div className="d-flex justify-content-center">
                {books.map(book => (
                <Card key={book._id} style={{ width: '18rem', margin: '2rem' }}>
                    <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Subtitle style={{marginBottom: '1rem'}}>{book.author}</Card.Subtitle>
                    <Card.Text>{book.description}</Card.Text>
                    <Button style={{marginTop: 'auto'}} variant="primary">Reserve</Button>
                    </Card.Body>
                    </Card>
            ))}
            </div>
        </div>
    );
};

export default Books;