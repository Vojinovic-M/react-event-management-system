import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import EventForm from './components/EventForm';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/event/create" element={<EventForm />} />
        <Route path="/event/edit/:id" element={<EventForm />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
