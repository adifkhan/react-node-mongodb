import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/user/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, []);

    const handleUpdateUser = event => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;

        const updatedUser = { name, email, phone };

        // Put/update data  //
        const url = `http://localhost:5000/user/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                alert('Profile Updated');
                navigate('/');
            })
    }

    return (
        <div>
            <h4>Update Profile : {user.name}</h4>
            <form onSubmit={handleUpdateUser}>
                <div>
                    <input
                        style={{ width: "400px", height: "20px", margin: "5px" }} type="text" name="name" placeholder={user.name} required />
                </div>
                <div>
                    <input
                        style={{ width: "400px", height: "20px", margin: "5px" }} type="email" name="email" placeholder={user.email} required />
                </div>
                <div>
                    <input
                        style={{ width: "400px", height: "20px", margin: "5px" }} type="number" name="phone" placeholder={user.phone} required />
                </div>
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;