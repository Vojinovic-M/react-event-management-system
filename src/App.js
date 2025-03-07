import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './pages/event/EventList';
import EventDetails from './pages/event/EventDetails';
import EventForm from './pages/event/EventForm';
import UserProfile from './pages/user/UserProfile';
import UserLogin from './pages/user/UserLogin';
import UserRegister from './pages/user/UserRegister';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/event/create" element={<EventForm />} />
        <Route path="/event/edit/:id" element={<EventForm />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
