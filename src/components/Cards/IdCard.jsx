import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./IdCard.css";

export default function IdCard({ user, photo, isAdminApproved = true }) {
  const cardRef = useRef(null);

  const downloadIdCardPDF = async () => {
    const element = cardRef.current;

    // Store original styles
    const originalStyles = {
      backgroundColor: element.style.backgroundColor,
      color: element.style.color
    };

    // Force styles for capture
    element.style.backgroundColor = 'white';
    element.style.color = 'black';

    // Hide download button during capture
    const downloadBtn = document.querySelector('.download-id-card-btn');
    if (downloadBtn) downloadBtn.style.visibility = 'hidden';

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure all text elements are visible in the clone
          const textElements = clonedDoc.querySelectorAll('p, h1, h2, h3, span, div');
          textElements.forEach(el => {
            el.style.color = 'black';
            el.style.opacity = '1';
            el.style.visibility = 'visible';
          });
        }
      });

      // Restore original styles
      element.style.backgroundColor = originalStyles.backgroundColor;
      element.style.color = originalStyles.color;

      // Get image data
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Create PDF with custom dimensions for ID card
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.60, 53.98] // Standard credit card size
      });

      // Calculate aspect ratio and positioning
      const imgWidth = 85.60;
      const imgHeight = 53.98;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Save the PDF with user's name
      const fileName = `${user.fullName || 'User'}_BYVS_ID_Card.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Restore original styles even if error occurs
      element.style.backgroundColor = originalStyles.backgroundColor;
      element.style.color = originalStyles.color;

      // Restore download button visibility
      if (downloadBtn) downloadBtn.style.visibility = 'visible';
    }
  };

  return (
    <div className="id-card-wrapper flex flex-col items-center">
      {/* ID Card Component */}
      <div className="id-card-container mx-auto" ref={cardRef}>
        {/* Top Section */}
        <div className="id-card-top-section">
          {/* Logo */}
          <div className="id-card-logo-container">
            <img
              src="/assests/logo.jpg"
              alt="Logo"
              className="id-card-logo"
            />
          </div>

          {/* Reg No under logo */}
          <p className="id-card-reg-no">REG. NO. : 66/22</p>

          {/* Title - Fixed positioning */}
          <div className="id-card-title-container">
            <h1 className="id-card-title">
              BHARATIYA YUVA <br />
              VIDYARTHI SANGATHAN <br />
              (BYVS)
            </h1>
            <p className="id-card-slogan">
              "FOR YOU , WITH YOU , FROM YOU"
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="id-card-bottom-section">
          {/* Membership ID Card Title */}
          <h2 className="id-card-main-title">
            MEMBERSHIP ID CARD
          </h2>

          {/* Details - More compact */}
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

          {/* User Photo */}
          <div className="id-card-photo-placeholder">
            {photo ? (
              <img src={photo} alt="User" className="id-card-photo" onLoad={() => console.log('Photo loaded successfully')} onError={() => console.error('Error loading photo')} />
            ) : (
              "Photo"
            )}
          </div>

          {/* DOI - Date of Issue */}
          <div className="id-card-doi">
            <p className="id-card-doi-label">D.O.I.</p>
            <p className="id-card-doi-value">: {user.joinedDate || "2024-01-15"}</p>
          </div>

          {/* Signature */}
          <div className="id-card-signature">
            <img src="/assests/signature.jpg" alt="Signature" className="id-card-signature-img" />
            <p className="id-card-signature-name">FOUNDER & NATIONAL PRESIDENT</p>
          </div>
        </div>
      </div>

      {/* Download Button - Only shows when admin approved */}
      {isAdminApproved && (
        <div className="id-card-download-section">
          <button
            onClick={downloadIdCardPDF}
            className="download-id-card-btn"
          >
            <i className="fas fa-download"></i>
            ⬇️ Download ID Card (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
