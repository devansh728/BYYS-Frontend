import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PhotoGallery from '../../components/MediaSections/PhotoGallery';
import VideoGallery from '../../components/MediaSections/VideoGallery';
import MediaCoverage from '../../components/MediaSections/MediaCoverage';
import PressNotes from '../../components/MediaSections/PressNotes';
import Modal from '../../components/Modal/Modal';
import './MediaGallery.css';

const MediaGallery = () => {
  const [modalData, setModalData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    document.title = 'Media Gallery - BYVS';
  }, []);

  const openModal = (item, index, items) => {
  console.log('Modal opening with:', item);
  console.log('Video URL:', item.video);
  console.log('Item type:', item.type);
  
  setModalData(item);
  setCurrentIndex(index);
  setAllItems(items);
};

  const closeModal = () => {
    setModalData(null);
    setCurrentIndex(0);
    setAllItems([]);
  };

  const navigateModal = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % allItems.length
      : (currentIndex - 1 + allItems.length) % allItems.length;
    
    setCurrentIndex(newIndex);
    setModalData(allItems[newIndex]);
  };

  return (
    <div className="media-gallery-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* Page Title Container */}
          <div className="page-title">
            <h1>Media Gallery</h1>
            <p>Capturing moments of youth empowerment and cultural revival</p>
          </div>

          {/* All Sections in Continuous Layout */}
          <div className="gallery-sections">
            <PhotoGallery onOpenModal={openModal} />
            <VideoGallery onOpenModal={openModal} />
            <MediaCoverage onOpenModal={openModal} />
            <PressNotes onOpenModal={openModal} />
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {modalData && (
        <Modal 
          data={modalData}
          onClose={closeModal}
          onNavigate={navigateModal}
          currentIndex={currentIndex}
          totalItems={allItems.length}
        />
      )}
    </div>
  );
};

export default MediaGallery;
