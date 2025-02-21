import React, { useState } from "react";
import axios from "axios";
function CreateProduct() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    description: "",
    category: "",
    tags: "",
    price: "",
    stock: "",
    images: [],
    previewImg: []
  });

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({
        ...formData,
        images: [...formData.images, e.target.files[0]],
        previewImg: [...formData.previewImg, URL.createObjectURL(e.target.files[0])]
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, name, description, category, tags, price, stock, images } = formData;

    console.log({
      email,
      name,
      description,
      category,
      tags,
      price,
      stock,
      images
    });

    const multipartFormData = new FormData();
    multipartFormData.append("email", email);   
    multipartFormData.append("name",name);
    multipartFormData.append("description",description)
    multipartFormData.append("category",category);
    multipartFormData.append("tags",tags);
    multipartFormData.append("price",price);
    multipartFormData.append("stock",stock);
    images.forEach((img) => {
      multipartFormData.append("images", img);
    });
    try {
        await axios.post("http://localhost:4534/product/create", multipartFormData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        
    } catch (error) {
      console.error(error);
        
    }



    
  };

  let categoryArr = ["Electronics", "Fashion", "Home Appliances", "Books"];

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid black", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Create Product</h2>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: "8px", border: "1px solid black" }}
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your Name"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: "8px", border: "1px solid black" }}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={{ padding: "8px", border: "1px solid black" }}
        ></textarea>

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ padding: "8px", border: "1px solid black" }}
        >
          <option>Choose a category</option>
          {categoryArr.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="Enter product tag"
          value={formData.tags}
          onChange={handleChange}
          style={{ padding: "8px", border: "1px solid black" }}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={{ padding: "8px", border: "1px solid black" }}
        />

        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          style={{ padding: "8px", border: "1px solid black" }}
        />

        <label htmlFor="images">Upload Photo</label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleChange}
          style={{ padding: "8px", border: "1px solid black" }}
        />

        <button
          type="submit"
          style={{ padding: "10px", color: "black", border: "none", backgroundColor: "lightblue", cursor: "pointer" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;