import React, { useState, useEffect } from 'react';
import './MediaSections.css';

const MediaCoverage = ({ onOpenModal }) => {
  const mediaItems = Array.from({ length: 16 }, (_, index) => ({
    id: index + 1,
    title: `Media Coverage ${index + 1}`,
    description: `BYVS Media Coverage Story ${index + 1}`,
    image: `/assests/media${index + 1}.jpg`,
    type: 'image'
  }));

  // Initially show only first 15
  const [visibleCount, setVisibleCount] = useState(15);

  const loadMore = () => {
    setVisibleCount(mediaItems.length); // show all
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.media-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.12}s`;
      el.classList.add('fade-in');
    });
  }, [visibleCount]);

  return (
    <section className="gallery-section">
      <div className="section-header">
        <h2>Media Coverage</h2>
        {/* <p>{visibleCount} media coverage snapshots of our work</p> */}
      </div>

      <div className="gallery-grid">
        {mediaItems.slice(0, visibleCount).map((item, index) => (
          <div
            key={item.id}
            className="gallery-item media-item"
            onClick={() => onOpenModal(item, index, mediaItems)}
          >
            <img
              src={item.image}
              alt={item.title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="item-placeholder" style={{ display: 'none' }}>
              <i className="fas fa-photo-video"></i>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}

        {/* "More" tile after visibleCount if not showing all */}
        {visibleCount < mediaItems.length && (
          <div
            className="gallery-item more-photos-item"
            onClick={loadMore}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') loadMore();
            }}
            aria-label="Load more media coverage"
          >
            <div className="more-photos-content">
              <i className="fas fa-plus"></i>
              <span>More</span>
              <p>{mediaItems.length - visibleCount} more available</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaCoverage;
