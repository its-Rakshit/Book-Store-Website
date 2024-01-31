import React from 'react';
import { useUserContext } from '../UserContext/UserContext';

function DisplayUser() {
  const { userData } = useUserContext();
  console.log('User Data:', userData);  
  return (
    <div>
      <h1>User Data:</h1>
      <p>Name: {userData?.name}</p>
      <p>Email: {userData?.email}</p>
      <p>Phone Number: {userData?.phone_no}</p>
      <p>Address: {userData?.address}</p>
    </div>
  );
}

export default DisplayUser;