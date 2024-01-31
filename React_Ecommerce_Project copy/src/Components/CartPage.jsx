import { useEffect, useState } from "react";
import userService from "../Services/userService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cart.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext/UserContext";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";

function CartPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getCartProduct(userData.id);
        setCartProducts(data.data);
      } catch (error) {
        console.error("Error fetching cart product data:", error);
      }
    };

    fetchData();
  }, []);

  const totalAmount = cartProducts.reduce((total, product) => total + product.price, 0);

  const options = {
    "key": "rzp_test_ASjO8TPmNWK3bh", 
    "amount": totalAmount * 100, 
    "currency": "INR",
    "name": "THE BOOK SHOP",
    "description": "Test Transaction",
    "handler": function (response){
        if (response.razorpay_payment_id) {
          setPaymentStatus('success');
          Buy()
          
          navigate('/Bought');
        } else {
          setPaymentStatus('failed');
          alert("The Payment Has Been Failed")
        }
    },
    "prefill": {
        "name": userData.name,
        "email": userData.email,
        "contact": userData.phone_no
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
  };

  async function Buy() {
    try {
      await userService.buyAllFromCart(userData.id);
    } catch (error) {
      console.error("Error purchasing products:", error);
      alert("An error occurred while purchasing products");
    }
  }

  const openCheckout = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  async function handleRemoveClick(proID, userID) {
    try {
      await userService.removeFromCart(proID, userID);
      setCartProducts(cartProducts.filter(product => product.id !== proID));
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  }

  async function handleBuyClick() {
    try {
      openCheckout();
    } catch (error) {
      console.error("Error purchasing products:", error);
      alert("An error occurred while purchasing products");
    }
  }

  return (
    <div className="m-3">
      <NavBar/>
      <h1 className=" fs-1 text-center">YOUR CART</h1>
      <div className="text-end mb-3 d-flex flex-row justify-content-end align-items-center">
        <button className="btn btn-outline-dark fs-5 me-5" onClick={handleBuyClick}>Buy All</button>
        <Link to="/Bought"><button className="btn btn-outline-dark fs-5">Order Details</button></Link>
      </div>
      {paymentStatus === 'success' && <div className="alert alert-success">Payment Successful</div>}
      {paymentStatus === 'failed' && <div className="alert alert-danger">Payment Failed</div>}
      <ul className="cart-p d-flex flex-row flex-wrap ms-4">
        {Array.isArray(cartProducts) && cartProducts.map((product) => (
          <li
            key={product.id}
            className="d-flex align-items-center"
          >
            <div className="me-5">
              <h5 className="mb-1">{product.name}</h5>
              <p className="mb-1">{product.author}</p>
              <p className="mb-1">Price: ₹{product.price}</p>
              
              <button
                className="btn btn-outline-dark mt-5"
                onClick={() => handleRemoveClick(product.id, userData.id)}
              >
                Remove from Cart
              </button>
            </div>
            <div className="col">
              <img
                src={product.image1}
                alt={product.name}
                className="img-thumbnail"
                style={{ width: "200px", height: "250px" }}
              />
              
            </div>
          </li>
        ))}
      </ul>
      </div>
  );
}

export default CartPage;
