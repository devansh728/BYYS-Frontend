import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [valid, setValid] = useState(false);
  const [validUser, setValidUser] = useState(false);
  const [validAdmin, setValidAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('X-User-Role');

    setValid(!!token);
    setValidUser(userRole === 'USER');
    setValidAdmin(userRole === 'ADMIN');
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {/* BYVS Center Text - Shows only when scrolled ON MOBILE ONLY */}
        {scrolled && (
          <div className="header-byvs-center">
            BYVS
          </div>
        )}

        {/* Fixed Left Logo */}
        <div className="header-fixed-left">
          <Link to="/">
            <img src="/assests/logo.jpg" alt="BYVS Logo" className="fixed-logo" />
          </Link>
          {!scrolled && <p className="reg-number">Reg No. 66/22</p>}
        </div>

        {/* Center Content */}
        <div className="header-center">
          {!scrolled && (
            <div className="header-scrollable">
              <h1 className="header-title">BHARATIYA YUVA VIDYARTHI SANGATHAN</h1>
              <p className="header-subtitle">(BYVS)</p>
            </div>
          )}

          {/* Navigation Bar for Desktop */}
          <nav className="nav-bar">
            <ul className="nav-links">
              <li>
                <Link
                  to="/"
                  className={isActive('/') || isActive('/home') ? 'active' : ''}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={isActive('/about') ? 'active' : ''}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/media-gallery"
                  className={isActive('/media-gallery') ? 'active' : ''}
                >
                  Media Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/join"
                  className={isActive('/join') || isActive('/join-us') ? 'active' : ''}
                >
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={isActive('/login') ? 'active' : ''}
                >
                  Login Portal
                </Link>
              </li>
              <li>
                {valid && validUser && (<Link to="/profile" className={isActive('/profile') ? 'active' : ''}>Dashboard</Link>)}
              </li>
              <li>
                {valid && validAdmin && (<Link to="/admin" className={isActive('/admin') ? 'active' : ''}>Dashboard</Link>)}
              </li>
              <li>
                <Link
                  to="/core-committee"
                  className={isActive('/core-committee') || isActive('/members') ? 'active' : ''}
                >
                  Core Committee
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className={isActive('/leaderboard') ? 'active' : ''}
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={isActive('/contact') || isActive('/contact-us') ? 'active' : ''}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className={isActive('/donate') || isActive('/donate-us') ? 'active' : ''}
                >
                  Donate Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Fixed Right Section */}
        <div className="header-fixed-right">
          {!scrolled && <div className="inspiration-text">Inspiration and Guidance</div>}
          <a href="/assests/shankaraji.jpg" target="_blank" rel="noopener noreferrer">
            <img src="/assests/shankaraji.jpg" alt="Shankaracharya Ji" className="fixed-logo" />
          </a>
          {/* Hindi text - shown on desktop, hidden on mobile */}
          {!scrolled && (
            <p className="hindi-text">
              ज्योतिष्पीठाधीश्वर जगद्गुरु शंकराचार्य स्वामी श्री अविमुक्तेश्वरानंद सरस्वती जी महाराज
            </p>
          )}
          {/* Hamburger menu - shown on mobile, hidden on desktop */}
          {!scrolled && (
            <button className="hamburger-mobile" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
              <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
              <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link
              to="/"
              className={isActive('/') || isActive('/home') ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={isActive('/about') ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/media-gallery"
              className={isActive('/media-gallery') ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              Media Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/join"
              className={isActive('/join') || isActive('/join-us') ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              Join Us
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={isActive('/login') ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              Login Portal
            </Link>
          </li>
          <li>
            <Link
              to="/core-committee"
              className={isActive('/core-committee') || isActive('/members') ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              Core Committee
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className={isActive('/leaderboard') ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              Leaderboard
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={isActive('/contact') || isActive('/contact-us') ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/donate"
              className={isActive('/donate') || isActive('/donate-us') ? 'active' : ''}
              onClick={toggleMobileMenu}
            >
              Donate Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile overlay backdrop */}
      {mobileMenuOpen && <div className="mobile-overlay" onClick={toggleMobileMenu}></div>}
    </>
  );
};

export default Header;
