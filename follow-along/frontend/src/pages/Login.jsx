import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();

  const [hide, setHide] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleHide = () => {
    setHide(!hide);
  };

  const handleForm = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4534/user/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login successful", response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/019/523/927/non_2x/abstract-digital-fingerprint-login-concept-identity-verification-illustration-with-digital-hand-wireframe-security-protection-on-a-futuristic-modern-background-vector.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white bg-opacity-75 p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Login to your account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              value={data.email}
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2">Password</label>
            <div className="relative">
              <input
                type={hide ? "password" : "text"}
                id="password"
                name="password"
                className="w-full p-2 border rounded pr-10"
                value={data.password}
                onChange={handleForm}
                required
              />
              <button
                type="button"
                onClick={handleHide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {hide ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div className="mb-4">
            <a href="/forgot-password" className="text-blue-500">Forgot your password?</a>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;