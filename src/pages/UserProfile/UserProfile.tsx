import React, { useState, useEffect } from 'react';
import { logout } from '../../services/AuthService';
import User from '../../models/User';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
    await logout();
  }

  useEffect(() => {

    fetch('https://localhost:7095/api/user/profile/', {
      method: 'GET',
      credentials: 'include', // za cookies
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {  throw new Error(`Failed to fetch user profile: ${response.status}`);  }
          return response.json();
      })

      .then( (data: any) => { setUser(data); })
      .catch(error => console.error('Error fetching event:', error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout}></button>
    </div>
    
  );
}
