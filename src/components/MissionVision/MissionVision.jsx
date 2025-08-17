import React from 'react';
import './MissionVision.css';

const MissionVision = () => {
  return (
    <section className="mission-vision">
      <div className="container">
        <h2 className="section-title">Our Mission & Vision</h2>
        <div className="mission-vision-grid">
          <div className="mission-card">
            <div className="card-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3 className="card-title">Our Mission</h3>
            <p className="card-description">
              To unite and empower India's youth through value-based education, skill development, and character building — blending traditional wisdom with modern knowledge, reviving cultural heritage, fostering self-reliance, and inspiring compassionate service for the upliftment of all, towards building a stronger and harmonious nation.
            </p>
          </div>

          <div className="vision-card">
            <div className="card-icon">
              <i className="fas fa-eye"></i>
            </div>
            <h3 className="card-title">Our Vision</h3>
            <p className="card-description">
              To nurture an enlightened generation of self-reliant, culturally rooted, and socially responsible youth — committed to the welfare of humanity, preservation of nature, and the revival and protection of our heritage and dharma, leading India towards a prosperous and value-driven future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
