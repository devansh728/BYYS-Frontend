import React from "react";
import "./IdCard.css"; // Import the CSS file

export default function IdCard({ user }) {
  return (
    <div className="id-card-container">
      {/* Top Section */}
      <div className="id-card-top-section">
        {/* Logo */}
        <div className="id-card-logo-container">
          <img
            src="../../public/assests/logo.jpg"
            alt="Logo"
            className="id-card-logo"
          />
        </div>
        <p className="id-card-reg-no">REG. NO. : 66/22</p>

        {/* Title */}
        <div className="id-card-title-container">
          <h1 className="id-card-title">
            BHARATIYA YUVA <br />
            VIDYARTHI SANGATHAN (BYVS)
          </h1>
          <p className="id-card-slogan">
            “FOR YOU , WITH YOU , FROM YOU”
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="id-card-bottom-section">
        {/* Membership ID Card Title */}
        <h2 className="id-card-main-title">
          MEMBERSHIP ID CARD
        </h2>

        {/* Details */}
        <div className="id-card-details-grid">
          <p className="id-card-label">Name</p>
          <p className="id-card-value">: {user.fullName}</p>

          <p className="id-card-label">Member ID</p>
          <p className="id-card-value">: generateMemberId</p>

          <p className="id-card-label">District</p>
          <p className="id-card-value">: Bangalore</p>

          <p className="id-card-label">State</p>
          <p className="id-card-value">: {user.state}</p>

          <p className="id-card-label">D.O.I.</p>
          <p className="id-card-value">: hello</p>
        </div>

        {/* Photo placeholder */}
        <div className="id-card-photo-placeholder">
          {user.photo ? (
            <img src={user.photo} alt="User" className="id-card-photo" />
          ) : (
            "Photo"
          )}
        </div>

        {/* Signature */}
        <div className="id-card-signature">
          <p className="id-card-signature-text">[Signature]</p>
          <p className="id-card-signature-name">Founder & National President</p>
        </div>
      </div>
    </div>
  );
}