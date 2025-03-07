import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get('/api/user/profile')
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;
