import "./DisplayCss.css";
import userService from "../Services/userService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";

function Display() {
  const [data, setData] = useState([]);
  const [query, setquery] = useState();
  const [searchData, setsearchData] = useState([1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.fetchAllProducts();
        const fetchedData = response.data;
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  async function handelLike(id) {

    try {
      await userService.likeProduct(id);
    } catch (error) {
      console.error("Error liking product:", error);
    }
  }

  function handelOnChangeQuery(e) {
    setquery(e.target.value);
  }

  async function handelSearch() {
    var rawData = await userService.searchProduct(query);
    setsearchData(rawData.data);
  }
  return (
    <div id="delete" className="m-3 display">
      <header>
        <div className="px-3 text-light first">
          <div className="">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-dark text-decoration-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-book-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                </svg>
              </a>
              <div className=" py-2 border-bottom mb-3">
                <div className="container d-flex flex-wrap justify-content-center">
                  <div className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto px-3">
                    <input
                      type="search"
                      className="form-control border-dark border-2"
                      onChange={handelOnChangeQuery}
                      placeholder="Search Product..."
                      aria-label="Search"
                    ></input>
                  </div>

                  <div className="text-end">
                    <button
                      className="btn btn-outline-dark me-4 border-2"
                      onClick={handelSearch}
                    >
                      Search
                    </button>
                    <Link to="/Cartpage">
                      <button className=" text-dark text-decoration-none border-0 bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="black"
                          className="bi bi-cart4"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                        </svg>
                      </button>
                    </Link>
                    <Link to="/UserEdit">
                      <button type="button" className="btn btn-dark ms-4">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="album bg-light border-dark">
        <div>
          {searchData[0] != 1 && (
            <div className="row">
              <h2 className="text-center text-dark p-3">Search Results</h2>
              {searchData.map((product, index) => (
                <div key={index} className="col-md-3">
                  <div className="card book-card">
                    <Link to={`/Discription/${product.id}`}>
                      <img
                        src={product.image1}
                        className="card-img-top"
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h3 className="card-title text-black">
                          {product.name}
                        </h3>
                        <p className="price text-black">₹{product.price}</p>
                        <div class="d-grid gap-2">
                          <button class="btn btn-dark " type="button">
                          View
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {searchData[0] != 1 && searchData.length == 0 && (
            <h3>No Results Found</h3>
          )}
        </div>
        <div className="second_mid">
          <h2 className="text-center text-dark p-3">Popular Books</h2>
          <div className="row">
            {data.map((product, index) => (
              <div key={index} className="col-md-3">
                <div className="card book-card">
                  <div className="sale-tag">SALE</div>
                  <div className="heart" onClick={() => handelLike(product.id)}>
                    ❤
                  </div>
                  <Link to={`/Discription/${product.id}`}>
                    <img
                      src={product.image1}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h3 className="card-title text-black">{product.name}</h3>
                      <p className="price text-black">₹{product.price}</p>
                      <div class="d-grid gap-2">
                          <button class="btn btn-dark fon" type="button">
                            View
                          </button>
                        </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Display;
