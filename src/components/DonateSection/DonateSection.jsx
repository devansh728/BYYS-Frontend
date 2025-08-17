import React, { useState } from 'react';
import './DonateSection.css';

const DonateSection = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    alert('Thank you! We will notify you when our donation portal goes live.');
    setEmail('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="donate-us">
      {/* Page Header */}
      <section className="donate-header">
        <h1>Donate Us</h1>
        <p>Support our mission to empower youth and preserve cultural heritage for future generations</p>
      </section>

      {/* Coming Soon Section */}
      <section className="coming-soon-section">
        <h2>Coming Soon</h2>
        
        <div className="portal-preview">
          <h3>Secure Donation Portal</h3>
          <p>We are working hard to bring you a secure and user-friendly donation platform. Soon you'll be able to contribute to our noble cause of youth empowerment and cultural preservation through multiple convenient payment methods.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i>
            <h4>Secure Payments</h4>
            <p>SSL encrypted transactions</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-credit-card"></i>
            <h4>Multiple Options</h4>
            <p>Card, UPI, Net Banking</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-receipt"></i>
            <h4>Tax Benefits</h4>
            <p>80G tax deduction receipt</p>
          </div>
        </div>
      </section>

      {/* Get Notified Section */}
      <section className="notify-section">
        <h3>Get Notified</h3>
        <p>Be the first to know when our donation portal goes live. Enter your email to receive updates.</p>
        
        <form onSubmit={handleEmailSubmit} className="email-form">
          <div className="email-input-group">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="notify-btn">
              <i className="fas fa-bell"></i>
              Notify Me
            </button>
          </div>
        </form>
      </section>

      {/* Contact Information Section */}
      <section className="contact-donation-section">
        <h3>Contact Us for Donations</h3>
        <p>For immediate assistance with donations, reach out to us through these methods</p>

        <div className="contact-donation-grid">
          <div className="contact-donation-card">
            <div className="contact-icon">
              <i className="fas fa-phone"></i>
            </div>
            <h4>Call Us</h4>
            <p>For immediate donations, call us</p>
            <strong>+91 89603 84718</strong>
          </div>

          <div className="contact-donation-card">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h4>Email Us</h4>
            <p>Send your queries to</p>
            <strong>contact@byvs.org</strong>
          </div>

          <div className="contact-donation-card">
            <div className="contact-icon">
              <i className="fas fa-university"></i>
            </div>
            <h4>Bank Transfer</h4>
            <p>Direct bank transfer details available on request</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonateSection;
