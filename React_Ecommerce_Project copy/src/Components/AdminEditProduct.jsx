import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userService from "../Services/userService";
import Swal from "sweetalert2";

const AdminEditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0,
    discountedprice: 0,
    author: "",
    releaseddate: "",
    likes: 0,
    copiesSold: 0,
    image1: "",
  });

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = () => {
    userService
      .getProduct(productId)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdateProduct = () => {
    userService
      .adminUpdateProduct(product)
      .then(() => {
        Swal.fire({
          title: "Product Updated Successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error updating product:", error) &&
          Swal.fire({
            title: "Error! in Updating Product",
            icon: "success",
          });
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="fs-1">Edit Product</h2>
      <form>
        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productDescription" className="form-label">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="productDescription"
            name="description"
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productStock" className="form-label">
            Product Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="productStock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productPrice" className="form-label">
            Product Price
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productDiscountedPrice" className="form-label">
            Product Discounted Price
          </label>
          <input
            type="number"
            className="form-control"
            id="productDiscountedPrice"
            name="discountedprice"
            value={product.discountedprice}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productAuthor" className="form-label">
            Product Author
          </label>
          <input
            type="text"
            className="form-control"
            id="productAuthor"
            name="author"
            value={product.author}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productReleaseDate" className="form-label">
            Product Release Date
          </label>
          <input
            type="text"
            className="form-control"
            id="productReleaseDate"
            name="releaseddate"
            value={product.releaseddate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productLikes" className="form-label">
            Product Likes
          </label>
          <input
            type="number"
            className="form-control"
            id="productLikes"
            name="likes"
            value={product.likes}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productCopiesSold" className="form-label">
            Product Copies Sold
          </label>
          <input
            type="number"
            className="form-control"
            id="productCopiesSold"
            name="copiesSold"
            value={product.copiesSold}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 mt-4 fs-5">
          <label htmlFor="productImage1" className="form-label">
            Product Image 1
          </label>
          <input
            type="text"
            className="form-control"
            id="productImage1"
            name="image1"
            value={product.image1}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="btn btn-dark mt-2 mb-5 fs-5"
          onClick={handleUpdateProduct}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
