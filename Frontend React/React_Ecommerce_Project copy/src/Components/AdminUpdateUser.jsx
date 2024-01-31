import { useState, useEffect } from "react";
import userService from "../Services/userService";
import "./form.css";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function AdminUpdateUser() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone_no: "",
    password: "",
  });

  useEffect(() => {
    console.log(userId);
    if (userId) {
      userService
        .adminGetUserById(userId)
        .then((res) => {
          const userData = res.data;
          setUser({
            ...userData,
            password: "",
          });
          console.log(res);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userId]);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userService
      .adminUpdateUser(user)
      .then(() =>
        Swal.fire({
          title: "User Updated Successfully",
          icon: "success",
        })
      )
      .catch(
        (error) => console.error("Error updating user:", error) &&
        Swal.fire({
          title: "Error! in Updating User",
          icon: "error",
        })
      );
  };

  return (
    <div className="form mt-5">
      <h2 className="text-center fs-1">Admin Update User</h2>
      <Form className="mt-3 fs-5" onSubmit={handleSubmit}>
        <Form.Group controlId="formUserName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formUserEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formUserAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formUserPhoneNo">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone_no"
            value={user.phone_no}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formUserPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          className="update mt-5 px-5 py-2 fs-5"
          variant="dark"
          type="submit"
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

export default AdminUpdateUser;
