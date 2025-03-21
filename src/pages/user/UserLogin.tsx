import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { loginUser } from '../../store/thunks/authThunks';
import Button from '../../lib/form/Button';
import Label from '../../lib/form/Label';
import Input from '../../lib/form/Input';

export default function UserLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('')

    dispatch(loginUser({ email, password}))
      .unwrap()
      .then(() => navigate('/user/profile'))
      .catch((error) => {
        console.error('Login failed: ', error)
        setError(error.message || 'Login failed, please try again.')
      })
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-xl bg-white p-12 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Sign in to your account</h2>
        </div>
        {error && <span className='text-red-600'>{error}</span>}

        <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input name="email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required
            />
          </div>

          <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-500">
            Sign in
          </Button>
        </form>

        <span className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/user/register" className="text-indigo-600 hover:text-indigo-500">
            Register here
          </Link>
        </span>
      </div>
    </div>
  )
}