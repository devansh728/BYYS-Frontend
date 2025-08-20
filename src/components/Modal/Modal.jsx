import React, { useEffect, useRef, useState } from 'react';
import './Modal.css';

const Modal = ({ data, onClose, onNavigate, currentIndex, totalItems }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced cleanup for body scroll
  useEffect(() => {
    // Store original overflow value
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    
    // Prevent body scroll when modal opens
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    return () => {
      // Restore original styles when modal closes
      document.body.style.overflow = originalOverflow || 'unset';
      document.body.style.position = originalPosition || 'static';
      document.body.style.width = 'auto';
      
      // Force scroll restoration
      setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }, 100);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setUserInteracted(false);
  }, [data]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Disable keyboard controls on mobile
      if (isMobile) return;
      
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          if (totalItems > 1) onNavigate('prev');
          break;
        case 'ArrowRight':
          if (totalItems > 1) onNavigate('next');
          break;
        case ' ': // Spacebar for play/pause
          if (videoRef.current && data.type === 'video' && userInteracted) {
            e.preventDefault();
            if (videoRef.current.paused) {
              videoRef.current.play().catch(console.error);
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

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose, onNavigate, data, totalItems, userInteracted, isMobile]);

  // Handle video loading
  useEffect(() => {
    if (videoRef.current && data.type === 'video') {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        setIsLoading(false);
        setHasError(false);
        console.log('Video can play');
      };

      const handleError = (e) => {
        console.error('Video error:', e);
        setIsLoading(false);
        setHasError(true);
      };

      const handleLoadStart = () => {
        setIsLoading(true);
        setHasError(false);
      };

      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded');
        setIsLoading(false);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      // Load the video
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [data]);

  const isVideo = data.type === 'video' || data.video;

  // Enhanced close handler
  const handleClose = () => {
    // Pause video if playing
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    
    // Force scroll restoration
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    
    // Call the original onClose
    onClose();
    
    // Additional cleanup after a short delay
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      window.scrollTo(0, window.scrollY); // Trigger scroll restoration
    }, 150);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      setUserInteracted(true);
      
      // On mobile, ensure the video is unmuted for user interaction
      if (isMobile) {
        videoRef.current.muted = false;
      }
      
      if (videoRef.current.paused) {
        videoRef.current.play().catch((error) => {
          console.error('Play failed:', error);
          setHasError(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoError = (e) => {
    console.error('Video failed to load:', data.video);
    console.error('Error details:', e.target.error);
    setHasError(true);
    setIsLoading(false);
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', data.image);
    setHasError(true);
    setIsLoading(false);
  };

  const retryLoad = () => {
    setHasError(false);
    setIsLoading(true);
    setUserInteracted(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    if (isMobile && isVideo && !userInteracted) {
      e.preventDefault();
      handleVideoClick(e);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="modal show" onClick={handleBackdropClick}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close" onClick={handleClose} aria-label="Close modal">
          <i className="fas fa-times"></i>
        </button>

        {/* Navigation Buttons - Hide on very small mobile screens */}
        {totalItems > 1 && !isMobile && (
          <>
            <button 
              className="modal-nav modal-prev" 
              onClick={() => onNavigate('prev')}
              aria-label="Previous item"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="modal-nav modal-next" 
              onClick={() => onNavigate('next')}
              aria-label="Next item"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </>
        )}

        {/* Loading Indicator */}
        {isLoading && !hasError && (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
            <p>Loading {isVideo ? 'video' : 'image'}...</p>
          </div>
        )}

        {/* Modal Content */}
        <div className="modal-content">
          {isVideo && !hasError ? (
            <div className="video-container" onTouchStart={handleTouchStart}>
              <video 
                ref={videoRef}
                src={data.video}
                controls={userInteracted}
                className="modal-media"
                width="100%"
                height="auto"
                playsInline
                webkit-playsinline="true"
                preload={isMobile ? "none" : "metadata"}
                muted={!userInteracted}
                onError={handleVideoError}
                onClick={handleVideoClick}
                onTouchEnd={handleVideoClick}
                onLoadedData={() => {
                  setIsLoading(false);
                  console.log('Video data loaded');
                }}
                style={{ 
                  maxHeight: isMobile ? '70vh' : '85vh',
                  objectFit: 'contain'
                }}
              >
                <source src={data.video} type="video/mp4" />
                <source src={data.video.replace('.mp4', '.webm')} type="video/webm" />
                Your browser does not support the video tag.
              </video>
              
              {/* Mobile-optimized play overlay */}
              {!userInteracted && !isLoading && (
                <div className="play-prompt mobile-play-prompt" onClick={handleVideoClick}>
                  <div className="play-button mobile-play-button">
                    <i className="fas fa-play"></i>
                    <span>{isMobile ? 'Tap to Play' : 'Click to Play Video'}</span>
                  </div>
                </div>
              )}
            </div>
          ) : !isVideo && !hasError ? (
            <img 
              src={data.image} 
              alt={data.title} 
              className="modal-media"
              onError={handleImageError}
              onLoad={() => setIsLoading(false)}
              style={{ 
                maxHeight: isMobile ? '70vh' : '85vh',
                objectFit: 'contain'
              }}
            />
          ) : null}
          
          {/* Error State - Mobile optimized */}
          {hasError && (
            <div className="modal-placeholder mobile-placeholder">
              <i className={`fas ${isVideo ? 'fa-video-slash' : 'fa-image'}`}></i>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
              <p className="error-msg">
                {isVideo ? 'Video could not be played' : 'Image could not be loaded'}
              </p>
              {!isMobile && (
                <p className="debug-info">
                  File: {data.video || data.image}
                </p>
              )}
              <button className="retry-btn mobile-retry-btn" onClick={retryLoad}>
                <i className="fas fa-redo"></i> Try Again
              </button>
              {isMobile && (
                <div className="mobile-tips">
                  <p><strong>Tips for mobile:</strong></p>
                  <ul>
                    <li>Ensure stable internet connection</li>
                    <li>Try refreshing the page</li>
                    <li>Check if video format is supported</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Info - Mobile optimized */}
        <div className="modal-info mobile-modal-info">
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          {data.source && <span className="source">Source: {data.source}</span>}
          {data.date && <span className="date">Date: {new Date(data.date).toLocaleDateString()}</span>}
          {totalItems > 1 && (
            <div className="modal-counter">
              {currentIndex + 1} of {totalItems}
              {isMobile && totalItems > 1 && (
                <div className="mobile-navigation">
                  <button 
                    onClick={() => onNavigate('prev')} 
                    disabled={currentIndex === 0}
                    className="mobile-nav-btn"
                  >
                    ← Previous
                  </button>
                  <button 
                    onClick={() => onNavigate('next')} 
                    disabled={currentIndex === totalItems - 1}
                    className="mobile-nav-btn"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          )}
          {isVideo && !hasError && (
            <div className="video-controls-info">
              <small>
                <i className="fas fa-info-circle"></i>
                {userInteracted 
                  ? (isMobile ? 'Tap video for controls' : 'Use video controls to play/pause') 
                  : (isMobile ? 'Tap video to start' : 'Click video to start playing')}
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
