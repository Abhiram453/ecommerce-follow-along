import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [hided, setHided] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleHide = () => {
    setHide(!hide);
  };
  const handleHided = () => {
    setHided(!hided);
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const handleForm = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmpass } = data;
    if (password !== confirmpass) {
      setError("Passwords do not match");
      return;
    }
    if (!name || !email || !password || !confirmpass) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4534/user/signup", {
        name,
        email,
        password,
        confirmpass,

      });
      setSuccess("Signup successful! Please check your email for activation link.");
      setError("");
      console.log("Successfully registered", response.data);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/014/468/621/non_2x/abstract-digital-technology-background-with-concept-security-vector.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white bg-opacity-75 p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Join our community</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              value={data.name}
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={data.email}
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={hide ? "password" : "text"}
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md pr-10"
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
          <div className="mb-4 relative">
            <label htmlFor="confirmpass" className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={hided ? "password" : "text"}
                id="confirmpass"
                name="confirmpass"
                className="mt-1 p-2 w-full border rounded-md pr-10"
                value={data.confirmpass}
                onChange={handleForm}
                required
              />
              <button
                type="button"
                onClick={handleHided}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {hided ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;