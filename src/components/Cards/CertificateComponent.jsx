import React from "react";
import "./CertificateSection.css";

export default function CertificateComponent({ data }) {
  return (
    <div className="certificate-container">
      {/* Logo + Reg. No */}
      <div className="logo-container">
        <div className="logo-circle">
          <img src="/assests/logo.jpg" alt="Logo" className="logo-image" />
        </div>
      </div>
      <p className="registration-number">
        Reg no: 66/22
      </p>

      {/* Title */}
      <div className="title-container">
        <h1 className="organization-title">
          BHARTIYA YUVA VIDYARTHI <br /> SANGATHAN (BYVS)
        </h1>
        <h2 className="certificate-title">
          CERTIFICATE OF HONOUR
        </h2>
        <p className="certificate-subtitle">THIS IS TO CERTIFY THAT</p>
      </div>

      {/* Body Content */}
      <div className="body-content">
        <div className="dynamic-line-container">
          <span className="dynamic-line-text">{data.fullName}</span>
          <p>
            _______________________________________________
          </p>
        </div>
        <div className="body-section">
          <div className="dynamic-line-container">
            <span className="dynamic-line-text">{data.position}</span>
          </div>
          Is elected as _________________ of Bhartiya Yuva Vidyarthi Sangathan from
        </div>
        <div className="body-section">
          <div className="dynamic-line-container">
            <span className="dynamic-line-text block-text">{data.block}</span>
            <span className="dynamic-line-text district-text">{data.district}</span>
          </div>
          ___________________ Block of ___________________
        </div>
        <div className="body-section">
          <div className="dynamic-line-container">
            <span className="dynamic-line-text state-text">{data.state}</span>
          </div>
          District of ___________________ State .
        </div>
        <p className="validity-text">
          This certificate is valid upto 1 year from the date of issue. <br />
          We wish you bright future.
        </p>
      </div>

      {/* Date + Signature */}
      <div className="issue-date">
        <p>Date Of Issue:</p>
        {data.date}
        <p className="signature-line">_</p>
      </div>

      <div className="signature-container">
        <p className="signature-label">[Signature]</p>
        <p className="signatory-name">RAJA SAKSHAM SINGH YOGI</p>
        <p className="signatory-title">FOUNDER & NATIONAL PRESIDENT</p>
      </div>
    </div>
  );
}