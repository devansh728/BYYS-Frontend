import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 10 slides with actual photo references
  const slides = [
    { id: 1, image: "/assests/slide1.jpg", titleEnglish: "Protest to protect religious heritage" },
    { id: 2, image: "/assests/slide2.jpg", titleEnglish: "Covid Mukt Bharat Mission by Team BYVS" },
    { id: 3, image: "/assests/slide3.jpg", titleEnglish: "Memorandum submitted to Degree College Principal." },
    { id: 4, image: "/assests/slide4.jpg", titleEnglish: "BYVS Camp Inaugration by Cabinet Minsiter." },
    { id: 5, image: "/assests/slide5.jpg", titleEnglish: "Plantation Drive on World Environment Day" },
    { id: 6, image: "/assests/slide6.jpg", titleEnglish: "Stationary and food distribution in Slum Area" },
    { id: 7, image: "/assests/slide7.jpg", titleEnglish: "BYVS Raid Against Cow Smugglers" },
    { id: 8, image: "/assests/slide8.jpg", titleEnglish: "Food Packet Distribution in Prayagraj" },
    { id: 9, image: "/assests/slide9.jpg", titleEnglish: "BYVS Membership Drive" },
    { id: 10, image: "/assests/slide10.jpg", titleEnglish: "Diwali Celebration with underprivileged Kids" }
  ];

  // Auto-change slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = index => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero" id="home">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: slide.image
                ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`
                : '',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="slide-caption">
              <h2 className="slide-title-english">{slide.titleEnglish}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button className="slider-btn prev-btn" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="slider-btn next-btn" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Navigation Dots */}
      <div className="slider-nav">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>

      {/* Counter */}
      <div className="slide-counter">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
};

export default Hero;
