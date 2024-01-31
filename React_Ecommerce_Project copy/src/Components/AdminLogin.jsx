import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        if (event.target.name === 'adminId') {
            setAdminId(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(adminId === "Admin" && password === "Admin@321"){
            console.log("Welcome to the Admin Panel")
            navigate("/AdminInterface")
        }else{
            console.log("Failed")
            setError('Invalid Admin ID or Password'); 
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Admin Login</h2>
                <input 
                    type="text" 
                    name="adminId" 
                    placeholder="use Admin for Admin ID" 
                    required 
                    onChange={handleInputChange} />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="use Admin@321 for Password" 
                    required
                    onChange={handleInputChange} />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default AdminLogin;
