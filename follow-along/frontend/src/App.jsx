import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import SellerProductPage from "./pages/SellerProduct";
import NavBar from './pages/Navbar'
import IndividualProduct from "./components/IndividualProduct";
import Cart from "./pages/Cart";
import Profile from "./components/Profile";
import Order from "./components/Order";

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