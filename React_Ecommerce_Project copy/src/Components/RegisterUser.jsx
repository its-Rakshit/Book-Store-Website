import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import userService from '../Services/userService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./RegisterUser.css"
import Swal from 'sweetalert2'

function RegisterUser() {

  const [user, setuser] = useState({
    name: "",
    email:"",
    phone_no:"",
    address:"",
    password:""
  })

  const [termsAccepted, setTermsAccepted] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) =>{
    const value = e.target.value;
    setuser({...user, [e.target.name] : value})
    console.log(user.password)
  }

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  }

  function submit(e){
    e.preventDefault();
    if (!termsAccepted) {
      Swal.fire({
        title: "Please Accept the Terms and Service",
        icon: "warning"
      });
      return;
    }
    userService.save(user).then((response) =>{
      if(response.status === 200){
        Swal.fire({
          title: "Product Updated Successfully",
          icon: "success"
        });
        Navigate('/');
        

      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <section className="vh-100 bg-image" >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form>
                    <div className="form-outline mb-4">
                      <input type="text" name='name' id="form3Example1cg" className="form-control form-control-lg" onChange={handleChange} />
                      <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" name='email' id="form3Example3cg" className="form-control form-control-lg" onChange={handleChange}/>
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="number" name='phone_no' id="form3Example4cg" className="form-control form-control-lg" onChange={handleChange}/>
                      <label className="form-label" htmlFor="form3Example4cg">Phone Number</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="text" name='address' id="form3Example4cdg" className="form-control form-control-lg" onChange={handleChange}/>
                      <label className="form-label" htmlFor="form3Example4cdg">Address</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" name='password' id="form3Example4cd" className="form-control form-control-lg" onChange={handleChange}/>
                      <label className="form-label" htmlFor="form3Example4cdg">Password</label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" onChange={handleCheckboxChange} />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-dark btn-block btn-lg gradient-custom-4" onClick={submit}>Register</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0"> Have already an account? <a href="#!" className="fw-bold"><u><Link to="/">Login here</Link></u></a></p>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterUser;
