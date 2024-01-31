import { Link } from 'react-router-dom';
// import {setquery,setsearchData} from 
// import userService from '../Services/userService';
// import { useEffect, useState } from 'react';

export default function NavBar(){

    return(
        <header>
    <div className="px-3 py-2 text-light first">
      <div className="">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-dark text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-book-fill" viewBox="0 0 16 16">
  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
</svg>         
            </a>
            <div className=" py-2 border-bottom mb-3">
      <div className="container d-flex flex-wrap justify-content-center">
        <div className="text-end"> 
         
        <Link to="/Cartpage"><button className=" text-dark text-decoration-none border-0 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" className="bi bi-cart4" viewBox="0 0 16 16"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
            </svg></button></Link>
            <Link to="/Display"><button type="button" className="btn btn-outline-dark ms-4 fs-5">Home</button></Link>
            <Link to="/UserEdit"><button type="button" className="btn btn-outline-dark ms-4 fs-5">Edit Profile</button></Link>
            
        </div>
      </div>
    </div>
      </div>
             
        </div>
        </div>
  
  </header>
    );
}