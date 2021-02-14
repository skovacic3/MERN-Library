import React, {useEffect, useState} from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() =>  {
        AuthService.getCurrentUser().then(user => setCurrentUser(user));
        console.log(currentUser);
    }, []);

    return (
        <div className="container">
            {currentUser &&
            <div>
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </header>
                    <p>
                    <strong>Id:</strong> {currentUser.id}
                    </p>
                    <p>
                    <strong>Email:</strong> {currentUser.email}
                    </p>
                {currentUser.admin ? 'Role: admin' : 'Role: user'}
            </div>}
        </div>
    );
};

export default Profile;