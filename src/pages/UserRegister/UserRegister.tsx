import React, { useState } from 'react';
import '../../lib/form.css';
import '../../lib/text.css';
import { register } from '../../services/AuthService';

export default function UserRegister() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await register(userData);
      if (result.message) {
        setSuccess("Registration successful. You can now login.");
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }

  };

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <h2>Create a new account</h2>
      </div>

      <div className="form-wrapper">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
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
                value={userData.email}
                onChange={handleChange}
                required
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
                value={userData.password}
                onChange={handleChange}
                required
                className="custom-input"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="custom-button">
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
