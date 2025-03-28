import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateProduct from "./components/CreateProduct";
import SellerProductPage from "./pages/SellerProductPage";
import NavBar from "./components/Nav";
import IndividualProduct from "./pages/IndividualProduct";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Order from "./pages/Order";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />

          {/* Product Management Routes */}
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/modify" element={<SellerProductPage />} />
          <Route path="/pro" element={<IndividualProduct />} />

          {/* Cart and Order Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />

          {/* Profile Route */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;