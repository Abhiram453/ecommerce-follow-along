import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar'; 
import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Signup from './pages/signup';
import CreateProduct from './pages/createProduct';
import ProductPage from './pages/productPage';
import SellerProductPage from './pages/sellerProduct';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/modify" element={<SellerProductPage />} />
      </Routes>
    </Router>
