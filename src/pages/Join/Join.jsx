import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import JoinForm from '../../components/JoinSection/JoinForm';
import './Join.css';

const Join = () => {
  useEffect(() => {
    document.title = 'Join BYVS - Bharatiya Yuva Vidyarthi Sangathan';
  }, []);

  return (
    <div className="join-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <JoinForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Join;
