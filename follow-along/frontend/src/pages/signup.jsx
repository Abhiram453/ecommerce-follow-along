import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4534/user/signup', {
        email,
        password,
        name
      });
      setSuccess('Signup successful! Please check your email for activation link.');
      setError('');
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/014/468/621/non_2x/abstract-digital-technology-background-with-concept-security-vector.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white bg-opacity-75 p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Join our community</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="mt-1 p-2 w-full border rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="mt-1 p-2 w-full border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="mt-1 p-2 w-full border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input type="password" className="mt-1 p-2 w-full border rounded-md" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Sign Up</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;