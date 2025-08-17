import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CoreCommittee from '../../components/MembersSection/CoreCommittee';
import './Members.css';

const Members = () => {
  useEffect(() => {
    document.title = 'Core Committee - BYVS';
  }, []);

  return (
    <div className="members-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <CoreCommittee />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Members;
