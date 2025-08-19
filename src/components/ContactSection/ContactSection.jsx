import React, { useState } from 'react';
import './ContactSection.css';

const validateForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Full Name is required.';
  }
  if (!formData.email.trim()) {
    errors.email = 'Email Address is required.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid.';
  }
  if (!formData.subject.trim()) {
    errors.subject = 'Subject is required.';
  }
  if (!formData.message.trim()) {
    errors.message = 'Message is required.';
  }
  
  return errors;
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(''); 

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log('Form has validation errors:', validationErrors);
      return;
    }

    setIsLoading(true);
    console.log('Form is valid. Submitting data:', formData);

    try {
      const response = await fetch('https://byys-backend.onrender.com/auth/otp/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      setResponseMessage('Thank you for your message! We will get back to you soon.');
      console.log('Feedback sent successfully.');

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Submission failed:', error);
      setResponseMessage('Oops! Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-us">
 
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>We're here to help and answer any questions you might have about our mission to empower youth and preserve cultural heritage</p>
      </section>

      <section className="get-in-touch">
        <h2>Get In Touch</h2>
        <p>Reach out to us through any of these convenient methods</p>

        <div className="contact-methods">
          <div className="contact-method">
            <div className="method-header">
              <i className="fas fa-phone"></i>
              <h3>Phone</h3>
            </div>
            <p className="phone-number">+91 8960384718</p>
            <p className="timing">9:00 AM to 6:00 PM (All days)</p>
          </div>

          <div className="contact-method">
            <div className="method-header">
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
            </div>
            <p className="email">Contact@byvs.org</p>
            <p className="response-time">We'll respond within 24 hours</p>
          </div>

          <div className="contact-method">
            <div className="method-header">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Office Address</h3>
            </div>
            <address>
              Ward No 8, Mela Ground<br />
              Patti, Pratapgarh<br />
              Uttar Pradesh - 230135
            </address>
          </div>
          <div className="contact-method">
            <div className="method-header">
              <i className="fab fa-whatsapp"></i>
              <h3>WhatsApp</h3>
            </div>
            <p className="phone-number">+91 8960384718</p>
            <p className="timing">Quick messages & support</p>
            <p className="availability">Available 24/7</p>
          </div>
        </div>
      </section>
      <section className="visit-message-section">
        <h2>Visit Us or Send a Message</h2>
        <p>Find our location on the map or fill out the form to get in touch</p>

        <div className="visit-message-content">
          {/* Our Location */}
          <div className="our-location">
            <h3>Our Location</h3>
            <address>Ward No 8, Mela Ground, Patti, Pratapgarh</address>
            
            {/* Map with actual Google Maps link */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.123456789!2d81.9234567!3d25.8765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDUyJzM1LjYiTiA4McKwNTUnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: '10px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BYVS Office Location"
              ></iframe>
              <div className="map-link">
                <a 
                  href="https://maps.app.goo.gl/L3k24mJqEYfZCcHa6?g_st=ipc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-link-btn"
                >
                  <i className="fas fa-external-link-alt"></i>
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Query/Suggestion/Feedback Form */}
          <div className="contact-form-section">
            <h3>Query/Suggestion/Feedback Form</h3>
            <p>Share your queries, suggestions, or feedback with us. We value your input and will respond promptly.</p>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              
              {responseMessage && (
                <div className={`form-message ${responseMessage.includes('Thank you') ? 'success' : 'error'}`}>
                  {responseMessage}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter the subject"
                />
                {errors.subject && <p className="error-message">{errors.subject}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your message, query, suggestion, or feedback"
                  rows="5"
                ></textarea>
                {errors.message && <p className="error-message">{errors.message}</p>}
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Sending...' : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="office-hours-social">
        <h2>Office Hours & Connect With Us</h2>
        <p>Stay connected with us through various channels</p>

        <div className="office-social-content">
          {/* Office Hours */}
          <div className="office-hours">
            <h3>Office Hours</h3>
            <div className="hours-info">
              <p className="timing">9:00 AM to 6:00 PM</p>
              <p className="days">(All days of Week)</p>
            </div>
          </div>

          {/* Follow Us */}
          <div className="social-media">
            <h3>Follow Us</h3>
            <p>Stay updated with our latest news, events, and initiatives through our social media channels</p>
            
            <div className="social-links">
              <a 
                href="https://www.facebook.com/share/19TY7gFpWk/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link facebook"
              >
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </a>
              <a 
                href="https://x.com/byvs_official?s=11" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link twitter"
              >
                <i className="fab fa-x-twitter"></i>
                <span>X</span>
              </a>
              <a 
                href="https://www.instagram.com/byvs._.official/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
              <a 
                href="https://youtube.com/@byvsofficial998?si=Er9advhzQDLo1Dq1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link youtube"
              >
                <i className="fab fa-youtube"></i>
                <span>YouTube</span>
              </a>
              <a 
                href="https://www.linkedin.com/company/byvs-official" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://wa.me/918960384718" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link whatsapp"
              >
                <i className="fab fa-whatsapp"></i>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default ContactSection;
