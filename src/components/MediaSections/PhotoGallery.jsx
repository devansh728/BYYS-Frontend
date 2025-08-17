import React, { useState, useEffect } from 'react';
import './MediaSections.css';

const PhotoGallery = ({ onOpenModal }) => {
  const photos = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    title: `Photo ${index + 1}`,
    description: `BYVS Photo Gallery Image ${index + 1}`,
    image: `/assests/ps${index + 1}.jpg`,
    type: 'image'
  }));

  const [visibleCount, setVisibleCount] = useState(15);

  const loadMore = () => {
    setVisibleCount(photos.length);
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.photo-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add('fade-in');
    });
  }, [visibleCount]);

  return (
    <section className="gallery-section">
      <div className="section-header">
        <h2>Photo Gallery</h2>
        {/* <p>{visibleCount} photos from our events and activities</p> */}
      </div>

      <div className="gallery-grid">
        {photos.slice(0, visibleCount).map((photo, index) => (
          <div
            key={photo.id}
            className="gallery-item photo-item"
            onClick={() => onOpenModal(photo, index, photos)}
          >
            <img
              src={photo.image}
              alt={photo.title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="item-placeholder" style={{ display: 'none' }}>
              <i className="fas fa-image"></i>
              <h4>{photo.title}</h4>
              <p>{photo.description}</p>
            </div>
            <div className="item-overlay">
              <div className="overlay-content">
                <h4>{photo.title}</h4>
                <p>{photo.description}</p>
              </div>
            </div>
          </div>
        ))}

        {visibleCount < photos.length && (
          <div 
            className="gallery-item more-photos-item"
            onClick={loadMore}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if(e.key === 'Enter') loadMore(); }}
            aria-label="Load more photos"
          >
            <div className="more-photos-content">
              <i className="fas fa-plus"></i>
              <span>More Photos</span>
              <p>{photos.length - visibleCount} more available</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
