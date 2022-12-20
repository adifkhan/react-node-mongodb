import React from 'react';

const AddUser = () => {

    const handleAddUser = event => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;

        const user = { name, email, phone };

        // Post data to server  //
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                alert('User Added');
                event.target.reset();
            })
    }
    return (
        <div>
            <h4>Please add a new User</h4>
            <form onSubmit={handleAddUser}>
                <div>
                    <input
                        style={{ width: "400px", height: "20px", margin: "5px" }} type="text" name="name" placeholder='Name' required />
                </div>
                <div>
                    <input
                        style={{ width: "400px", height: "20px", margin: "5px" }} type="email" name="email" placeholder='Email' required />
                </div>
                <div>
                    <input
                        style={{ width: "400px", height: "20px", margin: "5px" }} type="number" name="phone" placeholder='Phone' required />
                </div>
                <input type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddUser;