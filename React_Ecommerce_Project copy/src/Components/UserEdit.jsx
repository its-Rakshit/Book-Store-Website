import React, { useState, useEffect } from 'react';
import userService from '../Services/userService';
import { Form, Button } from 'react-bootstrap';
import { useUserContext } from '../UserContext/UserContext';

const UserEdit = () => {
  const { userData } = useUserContext();
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    phone_no: '',
    password: '',
    
  });

  useEffect(() => {
    console.log("The User ID IS = " + userData.id)
    if (userData && userData.id) {
      userService.adminGetUserById(userData.id)
        .then((res) => {
          const userData = res.data;
          setUser({
            ...userData,  
            password: '', 
           
          });
          console.log(res);  
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userData]);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userService.adminUpdateUser(user)
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div>
      <h2>User Edit</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={user.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formUserEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={user.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formUserAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={user.address} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formUserPhoneNo">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phone_no" value={user.phone_no} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formUserPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={user.password} onChange={handleChange} />
        </Form.Group>

        {/* Add more fields as necessary */}

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default UserEdit;
