import React, { useState, useEffect } from 'react';
import { logout } from '../../services/AuthService';
import User from '../../models/User';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const tokenData = localStorage.getItem('user');
    if (tokenData) {
      const { accessToken } = JSON.parse(tokenData!);
      fetch('https://localhost:7095/api/user/profile/', {
        method: 'GET',
        credentials: 'include', // za cookies
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
    })
      .then(response => {
        if (!response.ok) {  throw new Error(`Failed to fetch user profile: ${response.status}`);  }
          return response.json();
      })

      .then( (data: any) => { setUser(data); })
      .catch(error => console.error('Error fetching event:', error));
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  }

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h2>User Profile</h2>
      { user ? (
        <>
         <h1>Welcome, {user.email}</h1>
         <button onClick={handleLogout}>Logout</button>
         </>
      ) : (
        <>You are not logged in.</>
      ) }
     
    </div>
    
  );
}
