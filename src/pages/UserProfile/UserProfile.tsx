import React, { useState, useEffect } from 'react';
import { AuthService } from '../../services/AuthService';
import User from '../../models/User';


export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const tokenData = localStorage.getItem('user')
    if (tokenData) {
      const { accessToken } = JSON.parse(tokenData)
      AuthService.getProfile(accessToken)
      .then(setUser)
      .catch(console.error)
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout()
    .then(() => {
      localStorage.removeItem('user')
      setUser(null)
    })
    .catch(console.error)
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">User Profile</h2>
      { user ? (
        <>
          <h1 className="text-xl text-gray-600 mt-2">Welcome, {user.email}</h1>
          <button onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
          Logout
          </button>
         </>
      ) : (
        <>You are not logged in.</>
      ) }
     
    </div>
    
  );
}
