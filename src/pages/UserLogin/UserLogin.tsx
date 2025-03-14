import React, { useState } from 'react';
import '../../lib/form.css';
import '../../lib/text.css';
import { AuthService } from '../../services/AuthService';
import { Link, useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('')

    AuthService.login({ email, password} )
      .then((response) => {
        localStorage.setItem('user', JSON.stringify( {accessToken: response.accessToken}));
        navigate('/user/profile')
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert(`Login error: ${error}`);
        });
  };

  return (
    <div className="wrapper">
        <div className="header-wrapper">
          <h2>Sign in to your account</h2>
        </div>
        {error && <p style={{color: "red"}}>{error}</p>}

        <div className="form-wrapper">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="custom-label">Email address</label>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="custom-input"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="custom-label">Password</label>
                {/* <div className="text-sm"><a href="#" className="custom-bottom-text">Forgot password?</a></div> */}
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="custom-input"
                />
              </div>
            </div>

            <div>
              <button type="submit" className="custom-button">
                Sign in
              </button>
            </div>
          </form>

          <p className="grey-bottom-text">
            Don't have an account?{' '}
            <Link to="/user/register" className="custom-bottom-text">
              Register here
            </Link>
          </p>
        </div>
    </div>
  )
}