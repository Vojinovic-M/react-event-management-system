import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { firstName, lastName, email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/user/profile');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="flex min-h-full mx-auto w-1/2 bg-white flex-1 flex-col justify-center px-6 py-12 lg:px-8 rounded-lg mb-16">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-700">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="custom-label">
              First Name
            </label>
            <div className="mt-2">
              <input
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="custom-input"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="custom-label">
              Last Name
            </label>
            <div className="mt-2">
              <input
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="custom-input"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="custom-label">
              Email address
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="custom-input"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="custom-label">
              Password
            </label>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="custom-input"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="custom-button"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{' '}
          <a href="/user/login" className="custom-bottom-text">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
