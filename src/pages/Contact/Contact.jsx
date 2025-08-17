import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ContactSection from '../../components/ContactSection/ContactSection';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Us - BYVS';
  }, []);

  return (
    <div className="contact-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
