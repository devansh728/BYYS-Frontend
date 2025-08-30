import React, { useState } from 'react';
import './DonateSection.css';

const DonateSection = () => {
  const [email, setEmail] = useState('');
  const [copiedField, setCopiedField] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    alert('Thank you! We will keep you updated about our activities.');
    setEmail('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(''), 2000);
    });
  };

  return (
    <div className="donate-us">
      {/* Page Header */}
      <section className="donate-header">
        <h1>Donate Us</h1>
        <p>Support our mission to empower youth and preserve cultural heritage for future generations</p>
      </section>

      <section className="bank-details-section">
        <h2>Bank Details for Donation</h2>
        
        <div className="bank-details-container">
          {/* QR Code Section */}
          <div className="qr-section">
            <div className="qr-container">
              <img src="/assests/qr.jpg" alt="Payment QR Code" className="qr-image" />
              <div className="qr-overlay">
                <i className="fas fa-qrcode"></i>
              </div>
            </div>
            <h3>Scan & Pay</h3>
            <p>Scan this QR code with any UPI app to make instant donation</p>
            <div className="upi-badges">
              <span className="upi-badge">GPay</span>
              <span className="upi-badge">PhonePe</span>
              <span className="upi-badge">Paytm</span>
              <span className="upi-badge">BHIM</span>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bank-info">
            <h3>Bank Transfer Details</h3>
            <div className="bank-details-grid">
              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-university"></i>
                </div>
                <div className="detail-content">
                  <label>Bank Name</label>
                  <div className="detail-value">
                    <span>State Bank Of India</span>
                    <button 
                      className={`copy-btn ${copiedField === 'bank' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('State Bank Of India', 'bank')}
                    >
                      <i className={`fas ${copiedField === 'bank' ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                </div>
              </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="detail-content">
                  <label>Branch</label>
                  <div className="detail-value">
                    <span>Patti Pratapgarh</span>
                    <button 
                      className={`copy-btn ${copiedField === 'branch' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('Patti Pratapgarh', 'branch')}
                    >
                      <i className={`fas ${copiedField === 'branch' ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                </div>
              </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div className="detail-content">
                  <label>Account Holder Name</label>
                  <div className="detail-value">
                    <span>Saksham Singh</span>
                    <button 
                      className={`copy-btn ${copiedField === 'holder' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('Saksham Singh', 'holder')}
                    >
                      <i className={`fas ${copiedField === 'holder' ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                </div>
              </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-id-card"></i>
                </div>
                <div className="detail-content">
                  <label>PAN</label>
                  <div className="detail-value">
                    <span>NWEPS1331F</span>
                    <button 
                      className={`copy-btn ${copiedField === 'pan' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('NWEPS1331F', 'pan')}
                    >
                      <i className={`fas ${copiedField === 'pan' ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                </div>
              </div>
              </div>

              <div className="detail-item highlight">
                <div className="detail-icon">
                  <i className="fas fa-credit-card"></i>
                </div>
                <div className="detail-content">
                  <label>Account Number</label>
                  <div className="detail-value">
                    <span>40106341193</span>
                    <button 
                      className={`copy-btn ${copiedField === 'account' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('40106341193', 'account')}
                    >
                      <i className={`fas ${copiedField === 'account' ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                </div>
              </div>
              </div>

              <div className="detail-item highlight">
                <div className="detail-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div className="detail-content">
                  <label>IFSC Code</label>
                  <div className="detail-value">
                    <span>SBIN0000240</span>
                    <button 
                      className={`copy-btn ${copiedField === 'ifsc' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('SBIN0000240', 'ifsc')}
                    >
                      <i className={`fas ${copiedField === 'ifsc' ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPI Details */}
        <div className="upi-details">
          <h3>UPI Payment Details</h3>
          <div className="upi-info-grid">
            <div className="upi-item">
              <div className="upi-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="upi-content">
                <label>UPI Number</label>
                <div className="upi-value">
                  <span>8960384718</span>
                  <button 
                    className={`copy-btn ${copiedField === 'upi-number' ? 'copied' : ''}`}
                    onClick={() => copyToClipboard('8960384718', 'upi-number')}
                  >
                    <i className={`fas ${copiedField === 'upi-number' ? 'fa-check' : 'fa-copy'}`}></i>
                  </button>
              </div>
              </div>
            </div>

            <div className="upi-item">
              <div className="upi-icon">
                <i className="fas fa-at"></i>
              </div>
              <div className="upi-content">
                <label>UPI ID</label>
                <div className="upi-value">
                  <span>8960384718@ptsbi</span>
                  <button 
                    className={`copy-btn ${copiedField === 'upi-id' ? 'copied' : ''}`}
                    onClick={() => copyToClipboard('8960384718@ptsbi', 'upi-id')}
                  >
                    <i className={`fas ${copiedField === 'upi-id' ? 'fa-check' : 'fa-copy'}`}></i>
                  </button>
              </div>
              </div>
            </div>
          </div>
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
        <h3>Stay Updated</h3>
        <p>Get updates about our activities and impact. Enter your email to receive newsletters.</p>
        
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
              Subscribe
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
            <p>Direct bank transfer using above details</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonateSection;