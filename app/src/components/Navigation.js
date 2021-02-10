import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";

const Navigation = props => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        AuthService.getCurrentUser().then(user => {
            setCurrentUser(user)
        })
    }, []);
    const logOut = () => {
        setCurrentUser(undefined);
        AuthService.logout();
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to='/'>MERN Library</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to='/'>Home</Nav.Link>
                {currentUser ? <Nav.Link as={Link} to='/books'>Books</Nav.Link> : null}
                {currentUser && currentUser.admin ? <Nav.Link as={Link} to='/admin'>Admin</Nav.Link> : null}
                {currentUser ? null : <Nav.Link as={Link} to='/login'>Login</Nav.Link>}
                {currentUser ? null : <Nav.Link as={Link} to='/register'>Register</Nav.Link>}
                {currentUser ? <Nav.Link as={Link} to='/login' onClick={logOut}>Logout</Nav.Link> : null}
            </Nav>
        </Navbar>
    );
};

export default Navigation;