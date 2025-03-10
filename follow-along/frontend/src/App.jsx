import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import CreateProduct from './pages/createProduct';
import ProductPage from './pages/productPage';
import SellerProductPage from './pages/sellerProduct';
import Cart from './pages/Cart';
import ProductInfo from './pages/ProductInfo';

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
        <Route path="/my-products" element={<SellerProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-info" element={<ProductInfo />} />
      </Routes>
    </Router>
  );
}

export default App;