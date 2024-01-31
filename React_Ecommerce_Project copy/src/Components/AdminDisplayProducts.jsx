import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../Services/userService";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'

const AdminDisplayProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    userService
      .fetchAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await userService.adminDeleteProduct(productId);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      Swal.fire({
        title: "Product Deleted Successfully",
        icon: "warning"
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        title: "Error! in Deleting Product",
        icon: "error"
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fs-1 text-center">Product List</h2>
      <table className="table text-center ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Discounted Price</th>
            <th>Author</th>
            <th>Release Date</th>
            <th>Likes</th>
            <th>Copies Sold</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td>{product.discountedprice}</td>
              <td>{product.author}</td>
              <td>{product.releaseDate}</td>
              <td>{product.likes}</td>
              <td>{product.copiesSold}</td>
              <td>
                <Link
                  to={`/admin-edit-product/${product.id}`}
                  className="btn btn-outline-dark my-2 px-4"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-dark px-3 py-2"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDisplayProducts;
