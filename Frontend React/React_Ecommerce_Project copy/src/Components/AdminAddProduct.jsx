import { useState } from "react";
import userService from "../Services/userService";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0,
    discountedprice: 0,
    author: "",
    releaseDate: "",
    likes: 0,
    copiesSold: 0,
    image1: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSaveProduct = () => {
    userService.adminAddProduct(product).then(Swal.fire({
      title: "Product Added Successfully",
      icon: "success"
    })).catch((error) => {
      console.error("Error adding product:", error);
      Swal.fire({
        title: "Error! in Adding Product",
        icon: "error"
      });
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="fs-1">Add Product</h2>
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
            name="releaseDate"
            value={product.releaseDate}
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
          className="btn btn-dark mb-5 mt-2 fs-5"
          onClick={handleSaveProduct}
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
