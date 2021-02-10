import React, {useEffect, useState} from 'react';
import axios from "axios";
import AuthService from "../services/auth.service";

const Admin = props => {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        AuthService.isAdmin().then(r => setAdmin(r)).catch(e => console.log());
    }, [])
     return (
        <div>
            {admin ? <p>Admin page</p> : <p>Access denied</p>}
        </div>
    );
};

export default Admin;