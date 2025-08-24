import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./IdCard.css";

export default function IdCard({ user, isAdminApproved = true }) {
  const cardRef = useRef(null);

  const downloadIdCardPDF = async () => {
    const element = cardRef.current;
    
    try {
      // Create canvas from the ID card element
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      // Get image data
      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF with custom dimensions for ID card
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.60, 53.98] // Standard credit card size
      });

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, 85.60, 53.98);
      
      // Save the PDF with user's name
      const fileName = `${user.fullName || 'User'}_BYVS_ID_Card.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="id-card-wrapper">
      {/* ID Card Component */}
      <div className="id-card-container" ref={cardRef}>
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
            {user.photo ? (
              <img src={user.photo} alt="User" className="id-card-photo" />
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
            Download ID Card (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
