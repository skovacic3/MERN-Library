import React, {useEffect, useState} from 'react';
import AuthService from "../services/auth.service";
import userService from "../services/user.service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NewBookModal from "./NewBookModal";
import EditBookModal from "./EditBookModal";

const Admin = props => {
    const [admin, setAdmin] = useState(false);
    const [users, setUsers] = useState([])

    useEffect(() => {
        AuthService.isAdmin().then(r => setAdmin(r)).catch(e => console.log());
        userService.getAllUsers().then(r => setUsers(r)).catch(e => console.log());
    }, [])

    const UserList = (
        <div className="d-flex justify-content-center">
            {users.map(user => (
                <Card key={user._id} style={{ width: '18rem', margin: '2rem' }}>
                    <Card.Body>
                        <Card.Title>{'Username: ' + user.username}</Card.Title>
                        <Card.Subtitle style={{marginBottom: '1rem'}}>{user.admin ? 'Role: User': 'Role: Admin'}</Card.Subtitle>
                        <Card.Body>{'id: ' + user._id}</Card.Body>
                    </Card.Body>
                </Card>))}
        </div>
    )


     return (
        <div>
            {admin ? UserList : <p>Access denied</p>}
        </div>
    );
};

export default Admin;