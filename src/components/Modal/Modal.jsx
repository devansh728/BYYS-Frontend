import React, { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ data, onClose, onNavigate, currentIndex, totalItems }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onNavigate('prev');
          break;
        case 'ArrowRight':
          onNavigate('next');
          break;
        case ' ': // Spacebar for play/pause
          if (videoRef.current && data.type === 'video') {
            e.preventDefault();
            if (videoRef.current.paused) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNavigate, data]);

  const isVideo = data.type === 'video' || data.video;

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {/* Navigation Buttons */}
        {totalItems > 1 && (
          <>
            <button className="modal-nav modal-prev" onClick={() => onNavigate('prev')}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="modal-nav modal-next" onClick={() => onNavigate('next')}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </>
        )}

        {/* Modal Content */}
        <div className="modal-content">
          {isVideo ? (
            <video 
              ref={videoRef}
              src={data.video} 
              controls 
              autoPlay 
              className="modal-media"
              width="100%"
              height="auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : (
            <img 
              src={data.image} 
              alt={data.title} 
              className="modal-media"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          )}
          {/* Fallback for missing media */}
          <div className="modal-placeholder" style={{ display: 'none' }}>
            <i className={`fas ${isVideo ? 'fa-play' : 'fa-image'}`}></i>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <p className="error-msg">Media file not found</p>
          </div>
        </div>

        {/* Modal Info */}
        <div className="modal-info">
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          {data.source && <span className="source">Source: {data.source}</span>}
          {data.date && <span className="date">Date: {new Date(data.date).toLocaleDateString()}</span>}
          {totalItems > 1 && (
            <div className="modal-counter">
              {currentIndex + 1} of {totalItems}
            </div>
          )}
          {isVideo && (
            <div className="video-controls-info">
              <small>Press Spacebar to play/pause • Arrow keys to navigate</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
