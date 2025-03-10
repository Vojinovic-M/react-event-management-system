import React, { useState } from 'react';
import '../../lib/form.css';
import '../../lib/text.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/user/profile');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <h2>Create a new account</h2>
      </div>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="space-y-6">

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

        <p className="grey-bottom-text">
          Already have an account?{' '}
          <a href="/user/login" className="custom-bottom-text">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
