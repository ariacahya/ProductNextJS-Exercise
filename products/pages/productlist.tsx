import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

const koneksiProducts = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [detail, setDescription] = useState("");
  const [foto, setImage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await koneksiProducts.get("/");
      setProducts(response.data.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error retrieving products:", error);
    }
  };
  const handleAddProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await koneksiProducts.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      resetForm();
      setIsAdding(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (event) => {
    event.preventDefault();
    const id = selectedProduct.id;
  
    const updatedProduct = {
      title,
      price,
      weight,
      detail,
      foto,
    };
  
    const formData = new FormData();
    formData.append('title', updatedProduct.title);
    formData.append('price', updatedProduct.price);
    formData.append('weight', updatedProduct.weight);
    formData.append('detail', updatedProduct.detail);
    formData.append('images', updatedProduct.foto);
  
    try {
      await koneksiProducts.put(`/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      resetForm();
      setIsEditing(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  const handleDeleteProduct = async (id) => {
    try {
      console.log("Deleting product with id:", id);
      await koneksiProducts.delete(`/${id}`);
      console.log("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  const handleAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedProduct(null);
    resetForm();
  };

  const handleEdit = (product) => {
    setIsAdding(false);
    setIsEditing(true);
    setSelectedProduct(product);
    setTitle(product.title);
    setPrice(product.price);
    setWeight(product.weight);
    setDescription(product.detail);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setSelectedProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setWeight("");
    setDescription("");
    setImage("");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Product List</h1>
        <button className="btn btn-blue" onClick={handleAdd}>
          Add Product
        </button>
        {isAdding && (
          <form onSubmit={handleAddProduct}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Weight:</label>
              <input
                type="text"
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="detail"
                value={detail}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Image:</label>
              <input
                type="file"
                name="images"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-blue">
              Add
            </button>
            <button type="button" className="btn btn-blue" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
        {isEditing && selectedProduct && (
          <form onSubmit={handleEditProduct}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label>Weight:</label>
              <input
                type="text"
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="detail"
                value={detail}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Image:</label>
              <input
                type="file"
                name="images"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-blue">
              Update
            </button>
            <button type="button" className="btn btn-blue" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
        <table className="table">
          <thead>
            <tr>
              <th >Title</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.weight}</td>
                <td>{product.detail}</td>
                <td>
                  <img src={product.foto} alt="foto" width="80" />
                </td>
                <td>
                  <button className="btn btn-blue" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button className="btn btn-blue" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
