import { useState, useEffect } from 'react';
import userService from '../Services/userService';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function AdminDisplayAllUsers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        userService.adminAllUserList().then((res) => setData(res));
        console.log(data);
    }, []);

    const handleDelete = (user) => {
        userService.adminDeleteUser(user.userid).then(() => {
            setData(data.filter(item => item.userid !== user.userid));
        });
        Swal.fire({
            title: "User Deleted Successfully",
            icon: "warning"
        });
    };

    return (
        <div className='container'>
            <h2 className='text-center fs-1 mb-5'>Admin Display All Users</h2>
            <Table striped bordered hover className='text-center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.userid}>
                            <td>{user.userid}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/AdminUpdateUser/${user.userid}`}>
                                  <Button variant="outline-dark border-2 px-4">Edit</Button>
                                  {console.log("The id is " + user.userid)}
                                </Link>
                                {' '}
                                <Button variant="dark px-3 py-2" onClick={() => handleDelete(user)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminDisplayAllUsers;
