import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';
import { Link } from 'react-router-dom';
import Label from '../../lib/form/Label';
import Input from '../../lib/form/Input';
import Button from '../../lib/form/Button';

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
        <div className="flex flex-col mx-auto w-full max-w-xl bg-white p-12 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Create a new account</h2>
          </div>

          <div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input name="email" type="email" value={userData.email}
              onChange={handleChange} required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" value={userData.password}
              onChange={handleChange} required
            />
          </div>

          <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-500">
            Register
          </Button>
        </form>

        <span className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/user/login" className="text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </span>
      </div>
        </div>
      );
    } 
