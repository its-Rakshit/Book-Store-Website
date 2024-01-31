import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import userService from "../Services/userService";
import { useUserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useUserContext();
  const navigate = useNavigate();

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
  }

  async function handleSubmit() {
    try {
      const response = await userService.login(email, password);
      const data = response.data;
      console.log(data);
      if (data === null) {
        Swal.fire({
          title: "Invalid User Details",
          icon: "error",
        });
        return;
      }
      if (data.password === password && data.email === email) {
        setUserData({
          id: data.userid,
          name: data.name,
          email: data.email,
          phone_no: data.phone_no,
          address: data.address,
        });

        navigate("/Display");
      } else {
        Swal.fire({
          title: "Invalid User Details",
          icon: "error",
        });
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/RegistorUser");
    }
  }

  function handleRegistration() {
    try {
      navigate("/RegistorUser");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handelAdminLogin() {
    navigate("/AdminLogin");
  }

  return (
    <div id="main" className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              fill="currentColor"
              className="bi bi-book-half"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
            </svg>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control  fs-5"
              id="Username"
              aria-describedby="emailHelp"
              placeholder="Username"
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="Password"
              className="form-control  fs-5"
              id="Password"
              placeholder="password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="btn btn-color px-5 mb-5 w-100 fs-4"
            >
              Login
            </button>
          </div>
          <div className="form-text text-center mb-5 text-dark fs-5">
            Not Registered?{" "}
            <a
              href=""
              onClick={handleRegistration}
              className="text-dark fw-bold"
            >
              {" "}
              Create an Account
            </a>
          </div>

          <div class="d-grid gap-2 d-md-block text-center">
            <br />
            <h4>---OR---</h4> <br /> <br />
            <button
              class="btn btn-dark"
              type="button"
              onClick={handelAdminLogin}
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
