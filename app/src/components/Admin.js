import React, {useEffect, useState} from 'react';
import AuthService from "../services/auth.service";
import userService from "../services/user.service";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Admin = props => {
    const [admin, setAdmin] = useState(false);
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        userService.getAllUsers().then(r => setUsers(r)).catch(e => console.log());
    }

    const handleDelete = (id) => {
        userService.deleteUser(id).then(() => getUsers());
    }

    useEffect(() => {
        AuthService.isAdmin().then(r => setAdmin(r)).catch(e => console.log());
        getUsers();
    }, [])

    const UserList = (
        <div className="d-flex justify-content-center">
            {users.map(user => (
                <Card key={user._id} style={{ width: '18rem', margin: '2rem' }}>
                    <Card.Body>
                        <Card.Title>{'Username: ' + user.username}</Card.Title>
                        <Card.Subtitle style={{marginBottom: '1rem'}}>{user.admin ? 'Role: Admin': 'Role: User'}</Card.Subtitle>
                        <Card.Body>{'id: ' + user._id}</Card.Body>
                        <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
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