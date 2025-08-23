import React from 'react';
import './Certificate.css'; // Assuming you save the CSS in a file named Certificate.css

const CertificateComponent = () => {
    return (
        <div className="certificate">
            <div className="top-logo">
                <img src="../../../public/assests/logo.jpg" alt="BYVS Logo" />
            </div>

            <p className="reg-no">Reg no: 66/22</p>

            <div className="title-section">
                <h1>BHARTIYA YUVA VIDYARTHI <br /> SANGATHAN (BYVS)</h1>
                <h2>CERTIFICATE OF HONOUR</h2>
                <h3 className="certify-that">THIS IS TO CERTIFY THAT</h3>
            </div>

            <div className="details">
                <p><span className="line"></span></p>
                <p>Is elected as <span className="small-line"></span> of Bhartiya Yuva Vidyarthi Sangathan from</p>
                <p><span className="line"></span> Block of <span className="line"></span></p>
                <p>District of <span className="line"></span> State.</p>
                <p style={{ marginTop: '30px' }}>
                    This certificate is valid upto 1 year from the date of issue. <br />
                    We wish you a bright future.
                </p>
            </div>

            <div className="footer">
                <div className="date">
                    <label>Date Of Issue:</label>
                    <span className="line"></span>
                </div>
                <div className="signature">
                    <p className="actual-signature">Saksham</p>
                    <p className="name">RAJA SAKSHAM SINGH YOGI</p>
                    <p className="title">FOUNDER & NATIONAL PRESIDENT</p>
                </div>
            </div>
        </div>
    );
};

export default CertificateComponent;