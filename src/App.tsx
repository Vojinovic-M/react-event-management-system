import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import EventDetails from './pages/event/EventDetails';
import EventForm from './pages/event/EventForm';
import EventList from './pages/event/EventList';
import UserLogin from './pages/user/UserLogin';
import UserProfile from './pages/user/UserProfile';
import UserRegister from './pages/user/UserRegister';

export default function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/event/create" element={<EventForm />} />
          <Route path="/event/edit/:id" element={<EventForm />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
        </Routes>
      </main>
      <Footer/>
      </div>
    </Router>
  );
}
