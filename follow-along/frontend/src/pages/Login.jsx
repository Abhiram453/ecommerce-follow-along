import React, { useState } from 'react';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/019/523/927/non_2x/abstract-digital-fingerprint-login-concept-identity-verification-illustration-with-digital-hand-wireframe-security-protection-on-a-futuristic-modern-background-vector.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white bg-opacity-75 p-10 rounded-lg shadow-lg max-w-md w-full">
    
    {/* <div className="max-w-md mx-auto p-5 border rounded-md mt-40"> */}
      <h2 className="text-2xl font-semibold mb-4">Login to your account</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email address</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-2 border rounded pr-10"
              required
            />
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <IoMdEye/> : <IoMdEyeOff />}
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
      <p className="mt-4">
        Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
      </p>
    </div>
    </div>

    // </div>

  );
}

export default Login;
