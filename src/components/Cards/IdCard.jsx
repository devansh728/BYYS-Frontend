import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./IdCard.css";

export default function IdCard({ user, photo, isAdminApproved = true }) {
  const cardRef = useRef(null);

  const downloadIdCardPDF = async () => {
    const element = cardRef.current;
    
    if (!element) {
      alert('ID Card element not found');
      return;
    }

    // Hide download button during capture
    const downloadBtn = document.querySelector('.download-id-card-btn');
    if (downloadBtn) downloadBtn.style.display = 'none';

    try {
      // Force layout recalculation and wait for any pending renders
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create a temporary container for PDF generation
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.top = '-10000px';
      tempContainer.style.left = '0';
      tempContainer.style.width = '400px';
      tempContainer.style.height = '250px';
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.zIndex = '9999';
      
      // Clone the card
      const clone = element.cloneNode(true);
      clone.style.width = '400px';
      clone.style.height = '250px';
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.padding = '0';
      
      tempContainer.appendChild(clone);
      document.body.appendChild(tempContainer);

      // Apply all styles inline to the clone
      const applyInlineStyles = (sourceElement, targetElement) => {
        const sourceStyle = window.getComputedStyle(sourceElement);
        
        // Copy all computed styles
        for (let i = 0; i < sourceStyle.length; i++) {
          const property = sourceStyle[i];
          const value = sourceStyle.getPropertyValue(property);
          targetElement.style.setProperty(property, value, 'important');
        }

        // Ensure text is visible and properly styled
        if (targetElement.tagName === 'P' || targetElement.tagName === 'H1' || 
            targetElement.tagName === 'H2' || targetElement.tagName === 'SPAN') {
          targetElement.style.setProperty('color', '#000', 'important');
          targetElement.style.setProperty('visibility', 'visible', 'important');
          targetElement.style.setProperty('opacity', '1', 'important');
          
          // Keep underline only for main title
          if (targetElement.classList.contains('id-card-main-title')) {
            targetElement.style.setProperty('text-decoration', 'underline', 'important');
          } else {
            targetElement.style.setProperty('text-decoration', 'none', 'important');
          }
        }

        // Recursively apply to children
        const sourceChildren = sourceElement.children;
        const targetChildren = targetElement.children;
        
        for (let i = 0; i < sourceChildren.length && i < targetChildren.length; i++) {
          applyInlineStyles(sourceChildren[i], targetChildren[i]);
        }
      };

      // Apply styles to the entire clone
      applyInlineStyles(element, clone);

      // Ensure all user data is visible
      const cloneValues = clone.querySelectorAll('.id-card-value');
      const originalValues = element.querySelectorAll('.id-card-value');
      
      cloneValues.forEach((cloneValue, index) => {
        if (originalValues[index]) {
          cloneValue.textContent = originalValues[index].textContent;
          cloneValue.style.setProperty('color', '#000', 'important');
          cloneValue.style.setProperty('font-size', '9px', 'important');
          cloneValue.style.setProperty('font-weight', '600', 'important');
          cloneValue.style.setProperty('display', 'inline-block', 'important');
          cloneValue.style.setProperty('visibility', 'visible', 'important');
        }
      });

      // Wait for styles to be applied
      await new Promise(resolve => setTimeout(resolve, 200));

      // Generate canvas with high quality settings
      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 400,
        height: 250,
        windowWidth: 400,
        windowHeight: 250
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Create PDF with standard ID card dimensions
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.6, 53.98] // Credit card size
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 53.98);
      
      const fileName = `${user.fullName || 'User'}_BYVS_ID_Card.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Show download button again
      if (downloadBtn) downloadBtn.style.display = 'flex';
    }
  };

  return (
    <div className="id-card-wrapper">
      <div className="id-card-container" ref={cardRef}>
        {/* Top Section */}
        <div className="id-card-top-section">
          <div className="id-card-logo-container">
            <img
              src="/assests/logo.jpg"
              alt="Logo"
              className="id-card-logo"
              crossOrigin="anonymous"
            />
          </div>

          <p className="id-card-reg-no">REG. NO. : 66/22</p>

          <div className="id-card-title-container">
            <h1 className="id-card-title">
              BHARATIYA YUVA<br />
              VIDYARTHI SANGATHAN<br />
              (BYVS)
            </h1>
            <p className="id-card-slogan">
              "FOR YOU , WITH YOU , FROM YOU"
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="id-card-bottom-section">
          <h2 className="id-card-main-title">
            MEMBERSHIP ID CARD
          </h2>

          <div className="id-card-details-grid">
            <p className="id-card-label">Name</p>
            <p className="id-card-value">: {user.fullName || "John Doe"}</p>

            <p className="id-card-label">Member ID</p>
            <p className="id-card-value">: {user.membershipId || "BYVS2024001"}</p>

            <p className="id-card-label">District</p>
            <p className="id-card-value">: {user.district || "Mumbai"}</p>

            <p className="id-card-label">State</p>
            <p className="id-card-value">: {user.state || "Maharashtra"}</p>
          </div>

          <div className="id-card-photo-placeholder">
            {photo ? (
              <img 
                src={photo} 
                alt="User" 
                className="id-card-photo" 
                crossOrigin="anonymous"
              />
            ) : (
              "User"
            )}
          </div>

          <div className="id-card-doi">
            <p className="id-card-doi-label">D.O.I.</p>
            <p className="id-card-doi-value">
              : {new Date(user.joinedDate || "2024-01-15").toLocaleDateString('en-GB')}
            </p>
          </div>

          <div className="id-card-signature">
            <img 
              src="/assests/signature.jpg" 
              alt="Signature" 
              className="id-card-signature-img"
              crossOrigin="anonymous"
            />
            <p className="id-card-signature-name">FOUNDER & NATIONAL PRESIDENT</p>
          </div>
        </div>
      </div>

      {isAdminApproved && (
        <div className="id-card-download-section">
          <button
            onClick={downloadIdCardPDF}
            className="download-id-card-btn"
          >
            <i className="fas fa-download"></i>
            Download ID Card (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
