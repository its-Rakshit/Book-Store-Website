import React, { useEffect, useState } from 'react';
import userService from '../Services/userService';
import { useUserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getCartProduct(4);
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
    "name": "Acme Corp",
    "description": "Test Transaction",
    "handler": function (response){
        if (response.razorpay_payment_id) {
          setPaymentStatus('success');
          
          navigate('/Bought');
        } else {
          setPaymentStatus('failed');
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
    "theme": {
        "color": "#F37254"
    }
  };

  const openCheckout = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Cart</h1>
      {paymentStatus === 'success' && <div className="alert alert-success">Payment Successful</div>}
      {paymentStatus === 'failed' && <div className="alert alert-danger">Payment Failed</div>}
      <ul className="list-group">
        {Array.isArray(cartProducts) && cartProducts.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mb-1">{product.name}</h5>
              <p className="mb-1">{product.author}</p>
              <p className="mb-1">Price: ${product.price}</p>
              <p className="mb-1">
                Discounted Price: ${product.discountedprice}
              </p>
            </div>
            <div>
              <img
                src={product.image1}
                alt={product.name}
                className="img-thumbnail"
                style={{ width: "100px", height: "150px" }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p>Total Amount: ${totalAmount}</p>
        <button className="btn btn-primary" onClick={openCheckout}>Proceed to Payment</button>
      </div>
    </div>
  );
}

export default PaymentPage;
