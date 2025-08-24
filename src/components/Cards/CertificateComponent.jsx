import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Certificate.css";

export default function CertificateComponent({ data, showDownloadButton = true }) {
  const certificateRef = useRef(null);

  const downloadCertificatePDF = async () => {
    const element = certificateRef.current;
    
    try {
      // Create canvas from the certificate element
      const canvas = await html2canvas(element, {
        scale: 2, // Good quality for certificate
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#FFB64D',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      // Get image data
      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF in landscape orientation for certificate
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions to fit A4 landscape
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit in PDF while maintaining aspect ratio
      const imgAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;
      
      let finalWidth = pdfWidth - 20; // 10mm margin on each side
      let finalHeight = finalWidth / imgAspectRatio;
      
      if (finalHeight > pdfHeight - 20) {
        finalHeight = pdfHeight - 20; // 10mm margin on top and bottom
        finalWidth = finalHeight * imgAspectRatio;
      }
      
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
      
      // Save the PDF with user's name
      const fileName = `${data.recipientName || 'User'}_BYVS_Certificate.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating certificate PDF:', error);
      alert('Failed to generate certificate PDF. Please try again.');
    }
  };

  return (
    <div className="certificate-wrapper">
      {/* Certificate Component */}
      <div className="certificate" ref={certificateRef}>
        {/* Top Left Logo */}
        <div className="top-logo">
          <img src="/assests/logo.jpg" alt="BYVS Logo" />
        </div>

        {/* Registration Number */}
        <div className="reg-no">Reg no: {data.regNo || '66/22'}</div>

        {/* Main Heading */}
        <h1>
          BHARTIYA YUVA VIDYARTHI SANGATHAN <br />
          (BYVS)
        </h1>

        {/* Certificate Content */}
        <h2>CERTIFICATE OF HONOUR</h2>
        <h3>THIS IS TO CERTIFY THAT</h3>

        <div className="details">
          {/* Name with underline */}
          <div className="name-section">
            <div className="name-underline"></div>
            <div className="recipient-name">{data.recipientName || data.fullName || "RECIPIENT NAME"}</div>
          </div>
          <br />
          
          {/* Position section - Single line */}
          <p>
            Is elected as <span className="position-text">{data.position || "Office-Bearer"}</span> of Bhartiya Yuva Vidyarthi Sangathan from
          </p>
          
          {/* Block and District - Single line */}
          <p>
            <span className="block-text">{data.block || "Block-A"}</span> Block of <span className="district-text">{data.district || "Mumbai"}</span>
          </p>
          
          {/* State section - Single line */}
          <p>
            District of <span className="state-text">{data.state || "Maharashtra"}</span> State.
          </p>
          
          <br />
          
          {/* Validity */}
          <p>
            This certificate is valid upto 1 year from the date of issue. <br />
            We wish you bright future.
          </p>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="date">
            <label>Date Of Issue:</label>
            <div className="date-line">{data.dateOfIssue || data.date || "2025-08-19"}</div>
          </div>
          <div className="signature">
            <img src="/assests/signature1.png" alt="Signature" className="signature-img" />
            <div className="name">RAJA SAKSHAM SINGH YOGI</div>
            <div className="title">FOUNDER & NATIONAL PRESIDENT</div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      {showDownloadButton && (
        <div className="certificate-download-section">
          <button 
            onClick={downloadCertificatePDF} 
            className="download-certificate-btn"
          >
            <i className="fas fa-download"></i>
            Download Certificate (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
