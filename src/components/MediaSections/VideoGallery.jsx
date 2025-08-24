import React, { useState, useEffect } from 'react';
import './MediaSections.css';

const VideoGallery = ({ onOpenModal }) => {
  // Generate 24 videos with links video1.mp4 to video24.mp4
  const videos = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    title: `Video ${index + 1}`,
    description: `BYVS Video Gallery Clip ${index + 1}`,
    video: `/assests/video${index + 1}.mp4`,
    type: 'video'
  }));

  const [visibleCount, setVisibleCount] = useState(7);

   const handleItemClick = (video, index) => {
    console.log('Opening video:', video.video);
    console.log('Video exists:', video);
    onOpenModal(video, index, videos);
  };

  const loadMore = () => {
    setVisibleCount(videos.length);
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.video-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add('fade-in');
    });
  }, [visibleCount]);

  return (
    <section className="gallery-section">
      <div className="section-header">
        <h2>Video Gallery</h2>
        {/* <p>{visibleCount} videos from our events and activities</p> */}
      </div>

      <div className="gallery-grid">
        {videos.slice(0, visibleCount).map((video, index) => (
          <div
            key={video.id}
            className="gallery-item video-item"
            onClick={() => handleItemClick(video, index)}
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') onOpenModal(video, index, videos); }}
            role="button"
            aria-label={`Open video ${video.title}`}
          >
            <video
              src={video.video}
              muted
              preload="metadata"
              className="video-thumbnail"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
              controls={false}
            />
            <div className="item-placeholder" style={{ display: 'none' }}>
              <i className="fas fa-video"></i>
              <h4>{video.title}</h4>
              <p>{video.description}</p>
            </div>
            <div className="video-play-overlay">
              <i className="fas fa-play"></i>
            </div>
          </div>
        ))}

        {visibleCount < videos.length && (
          <div
            className="gallery-item more-photos-item"
            onClick={loadMore}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') loadMore(); }}
            aria-label="Load more videos"
          >
            <div className="more-photos-content">
              <i className="fas fa-plus"></i>
              <span>More Videos</span>
              <p>{videos.length - visibleCount} more available</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoGallery;
