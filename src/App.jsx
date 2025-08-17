import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import MediaGallery from './pages/MediaGallery/MediaGallery';
import Members from './pages/Members/Members';
import Join from './pages/Join/Join';
import Contact from './pages/Contact/Contact';
import Donate from './pages/Donate/Donate';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserDashboard from './pages/UserDashboard/UserDashboard'; // ✅ NEW USER DASHBOARD IMPORT
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/media-gallery" element={<MediaGallery />} />
          <Route path="/members" element={<Members />} />
          <Route path="/core-committee" element={<Members />} />
          <Route path="/join" element={<Join />} />
          <Route path="/join-us" element={<Join />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate-us" element={<Donate />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} /> {/* ✅ NEW USER DASHBOARD ROUTE */}
          <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} /> {/* ✅ ALTERNATIVE USER DASHBOARD ROUTE */}
          <Route path="/profile" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} /> {/* ✅ PROFILE ROUTE */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
