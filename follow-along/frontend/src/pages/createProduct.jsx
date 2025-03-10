import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useLocation } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

function CreateProduct() {
    const location = useLocation();
    const productData = location.state || {};
    const { _id, email, name, description, category, tags, price, stock, images, edit } = productData;

    const prevImg = images ? images.map(ele => `http://localhost:4534/products-photo/${ele}`) : [];

    const [formData, setFormData] = useState({
        email: email || "",
        name: name || "",
        description: description || "",
        category: category || "",
        tags: tags || [],
        price: price || "",
        stock: stock || "",
        images: [],
        previewImg: prevImg
    });

    useEffect(() => {
        setFormData(prevState => ({ ...prevState, previewImg: prevImg }));
    }, [productData]);

    const handleDeletePrevImg = (index) => {
        setFormData(prevState => {
            const newImages = [...prevState.images];
            const newPreviewImg = [...prevState.previewImg];
            newImages.splice(index, 1);
            newPreviewImg.splice(index, 1);
            return { ...prevState, images: newImages, previewImg: newPreviewImg };
        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "tags") {
            setFormData(prevState => ({ ...prevState, tags: value.split(",").map(tag => tag.trim()) }));
        } else if (name === "images" && files) {
            const newImages = Array.from(files);
            const newPreviewImg = newImages.map(file => URL.createObjectURL(file));
            setFormData(prevState => ({
                ...prevState,
                images: [...prevState.images, ...newImages],
                previewImg: [...prevState.previewImg, ...newPreviewImg]
            }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, name, description, category, tags, price, stock, images } = formData;
        if (!email || !name || !description || !category || !price || !stock) {
            alert("Please fill in all required fields");
            return;
        }

        const multiPartFormData = new FormData();
        Object.entries({ email, name, description, category, price, stock }).forEach(([key, value]) => 
            multiPartFormData.append(key, value)
        );
        tags.forEach(tag => multiPartFormData.append("tags", tag));
        images.forEach(image => multiPartFormData.append("images", image));

        try {
            const response = await axios.post("http://localhost:4534/products/create-product", multiPartFormData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 201) {
                alert("Product Created Successfully");
                setFormData({ email: "", name: "", description: "", category: "", tags: [], price: "", stock: "", images: [], previewImg: [] });
            }
        } catch (error) {
            console.error("Error", error);
            alert("Product is Not Created");
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const multiPartFormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(val => multiPartFormData.append(key, val));
            } else {
                multiPartFormData.append(key, value);
            }
        });

        try {
            const response = await axios.put(`http://localhost:4534/products/update/${_id}`, multiPartFormData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 200) {
                alert("Product Updated Successfully");
            }
        } catch (error) {
            console.error("Error", error);
            alert("Product is Not Updated");
        }
    };

    const categoryArr = ["Electronic", "Groceries", "Fashion", "Dairy"];

    return (
        <div className='flex justify-center items-center min-h-screen bg-cover bg-center' style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?office,technology')" }}>
            <div className='w-full max-w-lg bg-white p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-90'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>{edit ? "Edit Product" : "Create a New Product"}</h2>
                <form className='space-y-4'>
                    {Object.entries(formData).map(([key, value]) => (
                        key !== "images" && key !== "previewImg" && (
                            <div key={key}>
                                <label className='block font-medium text-gray-700'>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                <input className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' name={key} value={value} onChange={handleChange} required />
                            </div>
                        )
                    ))}
                    <label className='block font-medium text-gray-700'>Upload Photo</label>
                    <input className='hidden' type="file" name="images" id='upload' multiple onChange={handleChange} />
                    <label htmlFor="upload" className='cursor-pointer flex items-center space-x-2 text-blue-500 hover:text-blue-700'>
                        <IoIosAddCircleOutline size={24} /> <span>Add Images</span>
                    </label>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {formData.previewImg.map((img, index) => (
                            <div key={index}>
                                <IoCloseCircleOutline onClick={() => handleDeletePrevImg(index)} className='cursor-pointer' />
                                <img src={img} alt={`Preview ${index}`} className='w-20 h-20 object-cover rounded-md shadow-md' />
                            </div>
                        ))}
                    </div>
                    <button onClick={edit ? handleEdit : handleSubmit} className='w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition'>{edit ? "Edit" : "Submit"}</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
