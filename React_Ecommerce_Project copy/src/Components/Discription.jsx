import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../Services/userService";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../UserContext/UserContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./DiscriptionCss.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Swal from "sweetalert2";

function Description() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(0);
  const { userData } = useUserContext();
  const [carttext, setcarttext] = useState("Add To Cart");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getProduct(id);
        const fetchedData = response.data;
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();

    const fetchReviews = async () => {
      try {
        const response = await userService.getAllReviwes(id);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  const submitReview = async () => {
    if (userData) {
      try {
        const newReview = {
          productid: id,
          userid: userData.id,
          username: userData.name,
          stars,
          comment: reviewText,
        };
        await userService.postReview(newReview);

        setReviews((prevReviews) => [...prevReviews, newReview]);

        setReviewText("");
        setStars(0);
      } catch (error) {
        console.error("Error posting review:", error);
      }
    } else {
      console.error("userData is not logged in");
    }
  };

  const handelOnClick = async () => {
    try {
      const flag = (await userService.checkProductIsInCart(id, userData.id))
        .data;
      if (!flag) {
        await userService.addToCart(id, userData.id);
        setcarttext("Remove From Cart");
        Swal.fire({
          title: "Product Added to Cart",
          icon: "success",
        });
      } else {
        await userService.removeFromCart(id, userData.id);
        setcarttext("Add To Cart");
        Swal.fire({
          title: "Product Removed From Cart",
          icon: "warning",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    userService
      .checkProductIsInCart(id, userData.id)
      .then((res) => res.data)
      .then((res1) => {
        if(res1){
          setcarttext("Remove From Cart")
        }
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={data.image1}
              className="img-fluid rounded"
              alt="Book Image 1"
            />
          </div>
          <div className="col-md-6">
            <h2>{data.name}</h2>
            <p>
              <small>By {data.author}</small>
            </p>
            <p>{data.description}</p>
            <p>
              <strong>Price:</strong> ₹{data.price}
            </p>

            <p>
              <strong>Release Date:</strong> {data.releaseddate}
            </p>

            {data.likes && (
              <p>
                <strong>Likes:</strong> {data.likes}
              </p>
            )}

            <p>
              <strong>Stocks:</strong> {data.stock}
            </p>

            <p>
              <strong>copiessold:</strong> {data.copiessold}
            </p>

            {/* Other product details */}

            {data.stock >= 1 ? (
              <button onClick={handelOnClick} className="btn btn-dark">
                {carttext}
              </button>
            ) : (
              <button className="btn btn-dark disabled">Out of Stock</button>
            )}
          </div>
        </div>

        {/* Review Submission Form */}
        <div className="mb-4 mt-5">
          <h2 className="mb-3">Submit Your Review</h2>
          <label htmlFor="reviewText" className="form-label">
            Review:
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="form-control"
            rows="5"
          ></textarea>
          <div className="rating mt-2">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setStars(ratingValue)}
                    className="star-radio"
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= stars ? "#ffc107" : "#e4e5e9"}
                    size={40}
                  />
                </label>
              );
            })}
          </div>
          <button onClick={submitReview} className="btn btn-dark mt-2">
            Submit Review
          </button>
        </div>

        {/* Reviews Section */}
        <div className="containermt-5">
          <h3 className="text-center text-primary">Customer Reviews</h3>
          <div className="row">
            {reviews.map((review) => (
              <div key={review.id} className="col-md-4">
                <div className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://media.istockphoto.com/id/667701200/vector/man-user-icon-vector.jpg?s=612x612&w=0&k=20&c=XMHLhMZJgTii7iu6OZqeMNr8-bwHUAUimarZ-Olqn64="
                        alt="User"
                        className="img-fluid rounded-circle p-4 border border-primary"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{review.username}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {Array(Number(review.stars)).fill("⭐").join("")}
                        </h6>
                        <p className="card-text">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Description;
