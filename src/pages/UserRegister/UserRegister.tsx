import React, { useState } from 'react';
import '../../lib/form.css';
import '../../lib/text.css';
import { AuthService } from '../../services/AuthService';
import { Link } from 'react-router-dom';

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
              await AuthService.register(userData)
              setSuccess('Registration successful. You can now log in')
      } catch (error) {
        setError(error instanceof Error ? error.message : "Registration failed")
      }
    }
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

                <button type="submit" className="custom-button">
                  Register
                </button>
            </form>

            <span className="grey-bottom-text">
              Already have an account?{' '}
              <Link to="/user/login" className="custom-bottom-text">
                Login here
              </Link>
            </span>
          </div>
        </div>
      );
    } 
