import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [milestonesVisible, setMilestonesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const milestonesObserver = new IntersectionObserver(
      ([entry]) => setMilestonesVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    const milestonesElement = document.getElementById('our-works');
    
    if (element) observer.observe(element);
    if (milestonesElement) milestonesObserver.observe(milestonesElement);

    return () => {
      if (element) observer.unobserve(element);
      if (milestonesElement) milestonesObserver.unobserve(milestonesElement);
    };
  }, []);

  return (
    <>
      <section className={`what-is-byvs ${isVisible ? 'observe in-view' : 'observe'}`} id="about">
        <div className="container">
          <h2 className="section-title">What is BYVS?</h2>

          <div className="byvs-content">
            
            {/* LEFT SIDE - Logo Block */}
            <div className="byvs-image">
              <div className="logo-container">
                <img src="/assests/logo.jpg" alt="BYVS Logo" className="byvs-logo" />
                <div className="reg-number">Reg no. 66/22</div>
                <div className="byvs-name">BYVS</div>
              </div>
            </div>

            {/* RIGHT SIDE - Text */}
            <div className="byvs-text">
              <h3>Bhartiya Yuva Vidyarthi Sangathan</h3>
              <p>
                Bhartiya Yuva Vidyarthi Sangathan (BYVS) is a dynamic youth-led
                organization dedicated to empowering students and young people to
                become self-reliant, socially responsible, and committed to the
                nation's welfare. Founded in 2020 by <span className="highlight">Raja Saksham Singh Yogi</span> with the vision of
                uniting youth across India, BYVS works to inspire service to
                society, uplift every section of the community, and contribute to
                the greater good of humanity.
              </p>
              <p>
                Our mission goes beyond individual growth — we strive for the
                welfare of all living beings, including humans, animals, birds,
                aquatic life, and the preservation of nature in its entirety. At
                the heart of BYVS is a deep commitment to reviving India's fading
                cultural heritage, restoring our Vedic values, and upholding the
                eternal principles of Dharma.
              </p>
              <p>
                Under the divine guidance of Jagadguru Shankaracharya of
                Jyotishpeeth and through collective action, cultural revival, and
                a spirit of service, BYVS seeks to nurture a generation of youth
                who will lead with integrity, wisdom, and compassion — building a
                stronger, more harmonious Bharat for the future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
