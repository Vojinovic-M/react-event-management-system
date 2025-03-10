import React, { useState } from 'react';
import '../../lib/form.css';
import '../../lib/text.css';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('email:', email);
  };

  return (
    <div className="wrapper">
        <div className="header-wrapper">
          <h2>Sign in to your account</h2>
        </div>

        <div className="form-wrapper">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="custom-label">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="custom-input"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="custom-label">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="custom-bottom-text">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="custom-input"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="custom-button"
              >
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