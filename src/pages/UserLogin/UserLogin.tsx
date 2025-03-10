import React, { useState } from 'react';
import '../../lib/form.css';
import '../../lib/text.css';
import { login } from '../../services/AuthService';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
  
    try {
      const user = await login({ email, password });
      localStorage.setItem('user', JSON.stringify(user));
      console.log('user', user);
      window.location.href = '/user/profile';
    } catch (error) {
      setError('Invalid email or password');
    }
  
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
            <a href="/user/register" className="custom-bottom-text">
              Register here
            </a>
          </p>
        </div>
    </div>
  )
}