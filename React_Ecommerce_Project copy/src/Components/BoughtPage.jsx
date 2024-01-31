import { useEffect, useState } from "react";
import userService from "../Services/userService";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext/UserContext";

function BoughtPage() {
  const [data, setData] = useState([]);
  const { userData } = useUserContext();
  const [rerender, setRerender] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await userService.boughtProducts(userData.id);
        setData(responseData.data);
      } catch (error) {
        console.error("Error fetching bought products data:", error);
      }
    };
    fetchData();
  }, [rerender]);

  useEffect(() => {
    console.log("Again Updating")
    const fetchData = async () => {
      try {
        const responseData = await userService.boughtProducts(userData.id);
        setData(responseData.data);
      } catch (error) {
        console.error("Error fetching bought products data:", error);
      }
    };
    fetchData();
  },[]);

  

  async function handelCancel(id, name) {
    try {
      await userService.cancelOrder(id, name);
      setRerender((prev) => prev + 1); 
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  }


  return (
    <div className="container mt-4">
      <NavBar/>
      <h1 className="mb-4 text-center">Order Details</h1>
      <div className="row">
        {data.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={product.img}
                alt={product.pname}
                className="card-img-top"
                style={{ height: "450px" }}
              />
              <div className="card-body">
                <h5 className="card-title fs-4">{product.pname}</h5>
                <p className="card-text">{product.orderdate}</p>
                <div className="d-flex justify-content-around align-items-center">
                  <div className="btn-group me-5">
                    <Link to={`/Discription/${product.proid}`}>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary me-3"
                      >
                        View
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        handelCancel(userData.id, product.pname);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                  <small className="text-muted d-block">
                    Delivery Date: {product.deliverydate}
                  </small>
                  <small className="text-muted d-block">Status: {product.status}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoughtPage;
