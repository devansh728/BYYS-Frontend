import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DonateSection from '../../components/DonateSection/DonateSection';
import './Donate.css';

const Donate = () => {
  useEffect(() => {
    document.title = 'Donate Us - BYVS';
  }, []);

  return (
    <div className="donate-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <DonateSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
