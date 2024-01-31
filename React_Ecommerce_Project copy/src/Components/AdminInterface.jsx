import React from "react";
import "./AdminInterface.css";
import { Link } from "react-router-dom";
const AdminInterface = () => {
  return (
    <div className="Main">
      <h1 class="display-1 text-center text-bg-warning ">ADMIN PANEL</h1>

      <div className="options">
        <div className="users"><Link to={"/AdminDisplayAllUsers"}>Users</Link></div>
        <div className="products"> <Link to={"/adminAddProduct"}>Add Products</Link>  <br /> <Link to={"/adminDisplayProducts"}>Edit Products</Link>
        
        </div>
      </div>
    </div>
  );
};

export default AdminInterface;
