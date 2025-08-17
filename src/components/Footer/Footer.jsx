import React from 'react';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/share/19TY7gFpWk/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/byvs._.official/', label: 'Instagram' },
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/byvs-official', label: 'LinkedIn' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com/@byvsofficial998?si=Er9advhzQDLo1Dq1', label: 'YouTube' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* About Section */}
        <div className="footer-section">
  <div className="footer-logo">
    <a href="/assests/logo.jpg" className="footer-logo-link" target="_blank" rel="noopener noreferrer">
      <img src="/assests/logo.jpg" alt="BYVS Logo" className="footer-logo-image" />
    </a>
    <div className="footer-logo-text">BYVS</div>
  </div>
          <p>Empowering youth while preserving our ancient traditions and spiritual heritage.</p>

          {/* Social Media Links */}
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                className="social-icon-square"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={social.icon}></i>
              </a>
            ))}
            {/* X (Twitter) */}
            <a 
              href="https://x.com/byvs_official?s=11"
              className="social-icon-square social-x"
              aria-label="Twitter/X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/Home">Home</a>
          <a href="#about">About Us</a>
          <a href="/Leaderboard">Leaderboard</a>
          <a href="/Join">Join Us</a>
          <a href="/Contact">Contact Us</a>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p><i className="fas fa-envelope"></i> contact@byvs.org</p>
          <p><i className="fas fa-phone"></i> +91 89603 84718</p>
          <p><i className="fas fa-map-marker-alt"></i> Pratapgarh, UP</p>
          <a href="/Donate" className="footer-cta">Donate</a>
        </div>

        {/* Developer Credit */}
        <div className="footer-section">
          <div className="developed-by">
            <a href="https://automateace.online/" target="_blank" rel="noopener noreferrer" className="dev-logo">
              <img 
                src="/assests/autologo.jpg" 
                alt="AutomateAce Logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <i className="fas fa-code"></i>
            </a>
            <div className="dev-text">
              <span>Developed by</span>
              <a href="https://automateace.online/" target="_blank" rel="noopener noreferrer">AutomateAce</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 BYVS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
