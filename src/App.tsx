import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import EventDetails from './pages/EventDetails/EventDetails';
import EventForm from './pages/EventForm/EventForm';
import EventList from './pages/EventList/EventList';
import UserLogin from './pages/UserLogin/UserLogin';
import UserProfile from './pages/UserProfile/UserProfile';
import UserRegister from './pages/UserRegister/UserRegister';
import ProtectedAdminRoute from './pages/ProtectedAdminRoute/ProtectedAdminRoute';
import Unauthorized from './pages/Unauthorized/Unauthorized';

export default function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/event/create" element={
            <ProtectedAdminRoute>
              <EventForm />
            </ProtectedAdminRoute>
            } />
          <Route path="/event/edit/:id" element={
            <ProtectedAdminRoute>
              <EventForm />
            </ProtectedAdminRoute>
          } />
          <Route path="/unauthorized" element={<Unauthorized/>}></Route>
        </Routes>
      </main>
      <Footer/>
      </div>
    </Router>
  );
}
