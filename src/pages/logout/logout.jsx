import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName') || 'Member';
    setUserName(storedUserName);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('X-User-Role');
    localStorage.removeItem('userName');
    
    alert("You have logged out successfully. Thank you for being part of BYVS!");
    navigate('/login');
  };

  return (
    <>
      <Header />
      
      {/* Header Spacer */}
      <div className="header-spacer"></div>
      
      <div className="logout-page">
        <div className="logout-container">
          {/* Welcome Section */}
          <div className="logout-header">
            <div className="logout-icon">
              <i className="fas fa-user-shield"></i>
            </div>
            <h2>Hello, <span className="user-name">{userName}</span>!</h2>
            <div className="byvs-badge">
              <i className="fas fa-crown"></i>
              <span>BYVS Member</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="logout-content">
            <div className="welcome-message">
              <h3>
                <i className="fas fa-star"></i>
                Welcome to <strong>BYVS Member Portal</strong>
              </h3>
              <p className="tagline">Your Gateway to Recognition & Growth!</p>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-tachometer-alt"></i>
                <span>Access your personalized <strong>Dashboard</strong></span>
              </div>
              <div className="feature-item">
                <i className="fas fa-id-card"></i>
                <span>Download your <strong>Digital ID Card</strong></span>
              </div>
              <div className="feature-item">
                <i className="fas fa-certificate"></i>
                <span>Earn your <strong>Membership Certificate</strong></span>
              </div>
              <div className="feature-item">
                <i className="fas fa-chart-line"></i>
                <span>Track your <strong>contributions & achievements</strong></span>
              </div>
              <div className="feature-item">
                <i className="fas fa-trophy"></i>
                <span>See your name shine on our <strong>Leaderboard</strong></span>
              </div>
            </div>

            <div className="security-note">
              <div className="security-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <p>
                Stay active, connect with fellow members, and keep growing with BYVS! 
                Click <strong>Logout</strong> anytime to keep your account secure.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="logout-actions">
            <Link to="/dashboard" className="dashboard-btn">
              <i className="fas fa-arrow-left"></i>
              Back to Dashboard
            </Link>
            
            <button 
              onClick={handleLogout} 
              className={`logout-button ${isLoggingOut ? 'logging-out' : ''}`}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Logging Out...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-out-alt"></i>
                  Secure Logout
                </>
              )}
            </button>
          </div>

          {/* Footer Message */}
          <div className="logout-footer">
            <p>Thank you for being part of the BYVS community! 🙏</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Logout;