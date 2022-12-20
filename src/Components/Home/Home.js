import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddUser from '../AddUser/AddUser';

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users]);

    const handleDeleteUser = id => {
        const proceed = window.confirm('Are you Sure you want to remove this user?');
        if (proceed) {
            const url = `http://localhost:5000/user/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingUser = users.filter(user => user._id !== id);
                        setUsers(remainingUser);
                    }
                })
        }
    }
    return (
        <div>
            <AddUser></AddUser>
            <div style={{ margin: '10px 20px' }}>
                <h2>Our Users</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridGap: '10px' }}>
                    {
                        users.map(user =>
                            <div key={user._id}
                                style={{ border: '1px solid gray', padding: '5px' }}>
                                <h5>Name: {user.name}</h5>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone}</p>
                                <Link to={`/user/${user._id}`}><button style={{ margin: '2px' }}>Update</button></Link>
                                <button onClick={() => handleDeleteUser(user._id)} style={{ margin: '2px' }}>Remove User</button>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default Home;