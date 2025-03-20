import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import EventDetails from './pages/event/EventDetails';
import EventList from './pages/event/EventList';
import UserLogin from './pages/user/UserLogin';
import UserProfile from './pages/user/UserProfile';
import UserRegister from './pages/user/UserRegister';
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute';
import Unauthorized from './pages/user/Unauthorized';
import EventCreate from './pages/event/EventCreate';
import EventEdit from './pages/event/EventEdit';

export default function App() {
  return (
    <Router>
      <div className='app-container'>
        <div className='main-content'>
          <Header/>
          <main>
            <Routes>
              <Route path="/" element={<EventList />} />
              <Route path="/event/:id" element={< EventDetails />} />
              <Route path="/user/profile" element={< UserProfile />} />
              <Route path="/user/login" element={< UserLogin />} />
              <Route path="/user/register" element={< UserRegister />} />
              <Route element={<ProtectedAdminRoute/>}>
                <Route path="/event/create" element={<EventCreate/>} />
                <Route path="/event/delete" element={<EventEdit/>} />
                <Route path="/event/edit/:id" element={<EventEdit/>} />
              </Route>
              <Route path="/unauthorized" element={<Unauthorized/>}></Route>
            </Routes>
          </main>
        </div>
      <Footer/>
      </div>
    </Router>
  );
}
