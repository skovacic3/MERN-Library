import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";

const Navigation = props => {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.admin);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        setShowAdminBoard(false);
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to='/'>MERN Library</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to='/'>Home</Nav.Link>
                {currentUser ? null : <Nav.Link as={Link} to='/login'>Login</Nav.Link>}
                {currentUser ? null : <Nav.Link as={Link} to='/register'>Register</Nav.Link>}
                {currentUser ? <Nav.Link as={Link} to='/login' onClick={logOut}>Logout</Nav.Link> : null}
                {showAdminBoard ? <Nav.Link as={Link} to='/login'>Admin</Nav.Link> : null}
            </Nav>
        </Navbar>
    );
};

export default Navigation;