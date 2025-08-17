// src/pages/Home/Home.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import MissionVision from '../../components/MissionVision/MissionVision';
import WhyJoin from '../../components/WhyJoin/WhyJoin';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className='header-spacer'></div>
      <Hero />
      <About />
      <MissionVision />
      <WhyJoin />
      <Footer />
    </div>
  );
};

export default Home;
