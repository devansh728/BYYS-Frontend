import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashBoard.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { usePDF } from "react-to-pdf";
import IdCard from "../../components/Cards/IdCard";
import CertificateComponent from "../../components/Cards/CertificateComponent";

const UserDashboard = () => {
  const [photoData, setPhotoData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const [applicationStatus, setApplicationStatus] = useState('NOT_APPLIED');
  const [tasks, setTasks] = useState([]);
  const [applicationForm, setApplicationForm] = useState({
    district: '',
    state: '',
    contactDetails: '',
    socialWorkDescription: ''
  });
  const [certificateData, setCertificateData] = useState({
    fullName: '',
    position: '',
    block: '',
    district: '',
    state: '',
    dateOfIssue: '2025-08-19',
  });
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const targetRef = useRef();
  const { toPDF, loading: pdfLoading } = usePDF({
    filename: "byvs_id_card.pdf",
    page: { format: "A3", orientation: "portrait" },
    targetRef,
    onComplete: () => {
      setShowPreview(false); // Close modal after PDF generation
    }
  });
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);
  const certificateRef = useRef();
  const { toPDF: toCertificatePDF, loading: certificatePdfLoading } = usePDF({
    filename: "byvs_membership_certificate.pdf",
    page: { format: "A4", orientation: "landscape" },
    targetRef: certificateRef,
    onComplete: () => {
      setShowCertificatePreview(false); // Close modal after PDF generation
    }
  });
  // States for Edit Profile Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    phone: '',
    age: '',
    email: '',
    whatsappNumber: '',
    villageTownCity: '',
    blockName: '',
    district: '',
    state: '',
    profession: '',
    institutionName: '',
    institutionAddress: '',
    deletePhoto: false,
  });
  const [editFormError, setEditFormError] = useState(null);
  const [editIsSubmitting, setEditIsSubmitting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleCertificateDownloadClick = () => {
    if (applicationStatus === 'APPROVED') {
      setShowCertificatePreview(true);
    } else {
      alert("Your Office Bearer application must be APPROVED to download the certificate.");
    }
  };



  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('X-User-Role');

    if (!token || role !== 'USER') {
      navigate('/login');
      return;
    }

    fetchUserData();
    fetchUserStats();
    fetchApplicationStatus();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'office-bearer' && !applicationStatus) {
      fetchApplicationStatus();
    }
  }, [activeTab, applicationStatus]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://byvs.onrender.com/auth/otp/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
      // localStorage.setItem('userName', userData.fullName);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserPhoto = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://byvs.onrender.com/auth/otp/user/photo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (response.status === 200) {
          // Create object URL from blob data
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setPhotoData(imageUrl);
        } else if (response.status === 404) {
          setPhotoData(null); // No photo available
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Authentication required. Please log in.');
        } else if (err.response?.status === 404) {
          setPhotoData(null); // No photo available
          setError('Profile photo not found');
        } else {
          setError('Failed to load profile photo');
          console.error('Error fetching user photo:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserPhoto();

    // Cleanup function to revoke object URL
    return () => {
      if (photoData) {
        URL.revokeObjectURL(photoData);
      }
    };
  }, []);



  const fetchApplicationStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://byvs.onrender.com/api/office-bearer/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch application status');
      }
      const data = await response.json();
      setApplicationStatus(data.status);
      if (data.status === 'APPROVED') {
        fetchTasks();

        if (userData) {
          setCertificateData({
            recipientName: userData.fullName,
            position: 'Office-Bearer', // Assuming the API returns the position
            block: userData.blockName,
            district: userData.district,
            state: userData.state,
            regNo: '66/22', // This can be static or dynamic from API
            dateOfIssue: formatDate(userData.approvedAt), // Set current date
          });
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      setEditFormData({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        age: userData.age,
        whatsappNumber: userData.whatsappNumber,
        villageTownCity: userData.villageTownCity,
        blockName: userData.blockName,
        district: userData.district,
        state: userData.state,
        profession: userData.profession,
        institutionName: userData.institutionName,
        institutionAddress: userData.institutionAddress,
        deletePhoto: false,
      });
    }
  }, [userData]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://byvs.onrender.com/api/office-bearer/get-tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormChange = (e) => {
    setApplicationForm({ ...applicationForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    try {
      const response = await fetch('https://byvs.onrender.com/api/office-bearer/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationForm)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }
      setApplicationStatus('PENDING');
      alert(data.message);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleEditFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setEditIsSubmitting(true);
  //   setEditFormError(null);
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 1000));


  //     setUserData({ ...userData, ...editFormData });


  //     if (photoPreview) {
  //       setPhotoData(photoPreview);
  //     }


  //     if (editFormData.deletePhoto) {
  //       setPhotoData("https://via.placeholder.com/150");
  //     }

  //     alert("Profile updated successfully!");
  //     setShowEditModal(false);


  //     setSelectedPhoto(null);
  //     setPhotoPreview(null);
  //   } catch (error) {
  //     setEditFormError("Failed to update profile");
  //   } finally {
  //     setEditIsSubmitting(false);
  //   }
  // };

  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const ShareResponse = await fetch('https://byvs.onrender.com/referrals/userStats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!ShareResponse.ok) {
        throw new Error('Failed to fetch user stats');
      }
      const data = await ShareResponse.json();
      setUserStats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderOfficeBearerContent = () => {
    switch (applicationStatus) {
      case 'NOT_APPLIED':
        return (
          <div className="office-bearer-form">
            <div className="form-header">
              <i className="fas fa-user-tie"></i>
              <h2>Apply for Office Bearer</h2>
            </div>
            <p>Showcase your dedication to social work and become an official office bearer for BYVS. Fill out the form below to submit your application for review by the leadership team.</p>
            <form onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="district"><i className="fas fa-map-marker-alt"></i> District</label>
                  <input type="text" id="district" name="district" value={applicationForm.district} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="state"><i className="fas fa-flag"></i> State</label>
                  <input type="text" id="state" name="state" value={applicationForm.state} onChange={handleFormChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contactDetails"><i className="fas fa-phone"></i> Contact Details</label>
                <input type="text" id="contactDetails" name="contactDetails" value={applicationForm.contactDetails} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="socialWorkDescription"><i className="fas fa-heart"></i> Social Work Description</label>
                <textarea id="socialWorkDescription" name="socialWorkDescription" value={applicationForm.socialWorkDescription} onChange={handleFormChange} required minLength="50" maxLength="1000" placeholder="Describe your social work experience and why you want to become an office bearer..."></textarea>
              </div>
              {formError && <p className="error-message"><i className="fas fa-exclamation-triangle"></i> {formError}</p>}
              <button type="submit" disabled={isSubmitting} className="submit-btn">
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        );
      case 'PENDING':
        return (
          <div className="office-bearer-pending">
            <div className="status-icon">
              <i className="fas fa-hourglass-half"></i>
            </div>
            <h2>Application Status: Under Review</h2>
            <p>Your application is currently being reviewed by our leadership team. We will notify you once a decision has been made.</p>
            <p>Thank you for your patience and interest in serving BYVS!</p>
            <div className="pending-actions">
              <button onClick={() => setApplicationStatus('NOT_APPLIED')} className="edit-btn">
                <i className="fas fa-edit"></i> Edit Application
              </button>
            </div>
          </div>
        );
      case 'APPROVED':
        return (
          <div className="office-bearer-approved">
            <div className="status-icon approved">
              <i className="fas fa-crown"></i>
            </div>
            <h2>Congratulations! 🎉 You are an Office Bearer</h2>
            <p>Welcome to the BYVS leadership team! You can now view and manage your assigned tasks below.</p>
            <div className="tasks-section">
              <h3><i className="fas fa-tasks"></i> Your Assigned Tasks</h3>
              {tasks.length > 0 ? (
                <div className="tasks-grid">
                  {tasks.map((task) => (
                    <div key={task.id} className="task-card">
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                      <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-tasks">
                  <i className="fas fa-clipboard-check"></i>
                  <p>No tasks assigned at the moment.</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const dataedit = new FormData();
      for (const key in editFormData) {
        if (Object.prototype.hasOwnProperty.call(editFormData, key) && editFormData[key] !== null && editFormData[key] !== undefined) {
          dataedit.append(key, editFormData[key]);
        }
      }

      if (selectedPhoto) {
        dataedit.append("photo", selectedPhoto);
      }

      const response = await fetch('https://byvs.onrender.com/auth/otp', {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
        body: dataedit,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");
      if(data.token && data.token!=null){
        localStorage.setItem("authToken", data.token);
      }

      alert("Profile updated successfully!");
      setShowEditModal(false);
      fetchUserData();
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="profile-page">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="profile-page">
          <div className="error-container">
            <i className="fas fa-exclamation-triangle"></i>
            <p>Error: {error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!userData) {
    return (
      <>
        <Header />
        <div className="profile-page">
          <div className="error-container">
            <i className="fas fa-user-slash"></i>
            <p>No user data found</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Header />

      {/* Header Spacer - 220px */}
      <div className="header-spacer"></div>

      <div className="profile-page">
        {/* Enhanced Welcome Section with ID Card */}
        <div className="welcome-section">
          <div className="welcome-message-enhanced">
            <div className="welcome-content-enhanced">
              <i className="fas fa-star"></i>
              <h2>Welcome to BYVS!!</h2>
              <p className="congratulations-text">
                🎉 Congratulations, {userData.fullName}! 🎉
              </p>
              <p>Now you are a member of Team BYVS.</p>
            </div>

            {/* ID Card with Invite Section */}
            <div className="idcard-invite-wrapper">
              <div className="idcard-display-only">
                <IdCard user={userData} photo={photoData} />
              </div>

              <p className="invite-text">
                Invite others to get awards and a chance to feature at the top of the leaderboard!
              </p>

              {/* Share Referral Section */}
              <div className="welcome-share-section">
                <div className="referral-code-display">
                  <span className="referral-label">Your Referral Code:</span>
                  <div className="referral-code-inline">{userData.referralCode}</div>
                </div>

                <button className="share-referral-btn-welcome" onClick={() => setShowShareModal(true)}>
                  <i className="fas fa-share-alt"></i>
                  Share Your Referral Link
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Updated Profile Header without ID Card */}
        <section className="profile-header-redesigned">
          <div className="profile-info-section-full">
            {/* User Name Header */}
            <div className="user-name-header">
              <h1 className="profile-user-name">{userData.fullName}</h1>
              <p className="profile-user-title">BYVS Team Member</p>
            </div>

            {/* Details Grid */}
            <div className="profile-details-grid">
              <div className="detail-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{userData.district}, {userData.state}, India</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-id-card"></i>
                <span>Member ID: <strong>{userData.membershipId}</strong></span>
              </div>
              <div className="detail-item">
                <i className="fas fa-calendar-plus"></i>
                <span><strong>Joined:</strong> {formatDate(userData.joinedDate)}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-phone"></i>
                <span>{userData.phone}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-envelope"></i>
                <span>{userData.email || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-briefcase"></i>
                <span>{userData.profession || "Not specified"}</span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="edit-profile-section">
              <button className="edit-profile-btn" onClick={() => setShowEditModal(true)}>
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          </div>
        </section>

        <nav className="dashboard-tabs">
          <button className={`tab-button ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </button>
          <button
            className={`tab-button ${activeTab === "office-bearer" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("office-bearer");
              fetchApplicationStatus();
            }}
          >
            <i className="fas fa-briefcase"></i>
            <span>Office Bearer</span>
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === "profile" && (
            <>
              {/* Stats */}
              <section className="stats-section">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-share-alt"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Total Shares</h3>
                    <span className="stat-number">{userStats.totalShares || 0}</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Current Rank</h3>
                    <span className="stat-number">{userStats.currentRank || "N/A"}</span>
                  </div>
                </div>
              </section>

              {/* Account Credentials */}
              <section className="info-section account-credentials">
                <h2>
                  <i className="fas fa-user-cog"></i>
                  Account Credentials
                </h2>
                <div className="info-grid">
                  <div className="info-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <strong>Email Address</strong>
                      <p>{userData.email || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <strong>Phone Number</strong>
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-calendar"></i>
                    <div>
                      <strong>Registration Date</strong>
                      <p>{formatDate(userData.joinedDate)}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <strong>Account Status</strong>
                      <p className="status-active">Active & Verified</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Downloads Section (Referral section removed as it's now in welcome) */}
              <section className="info-section downloads-section">
                <h2>
                  <i className="fas fa-download"></i>
                  My Downloads
                </h2>
                <div className="downloads-grid">
                  <div className="download-item" onClick={() => handleCertificateDownloadClick()}>
                    <i className="fas fa-certificate"></i>
                    <div>
                      <strong>Office bearer appointment Letter</strong>
                      <p>Official appointment letter in PDF format</p>
                    </div>
                  </div>
                  <div className="download-item" onClick={() => setShowPreview(true)}>
                    <i className="fas fa-id-card"></i>
                    <div>
                      <strong>BYVS ID Card</strong>
                      <p>Official membership card in PDF format</p>
                    </div>
                  </div>
                  <div className="download-item">
                    <i className="fas fa-medal"></i>
                    <div>
                      <strong>Top Performer Badge</strong>
                      <p>Achievement certificate for excellent performance</p>
                    </div>
                  </div>
                  <div className="download-item">
                    <i className="fas fa-book"></i>
                    <div>
                      <strong>BYVS Guidelines Handbook</strong>
                      <p>Complete guide for BYVS members and activities</p>
                    </div>
                  </div>
                  <div className="download-item">
                    <i className="fas fa-images"></i>
                    <div>
                      <strong>Event Photos Package</strong>
                      <p>High-resolution photos from recent BYVS events</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Achievements */}
              <section className="info-section achievements-section">
                <h2>
                  <i className="fas fa-star"></i>
                  Your Achievements
                </h2>
                <div className="achievements-grid">
                  <div className="achievement-badge">
                    <i className="fas fa-user-plus"></i>
                    <span>New Member</span>
                  </div>
                  {userStats.totalShares > 1 && <div className="achievement-badge">
                    <i className="fas fa-share"></i>
                    <span>First Share</span>
                  </div>}
                  {/* <div className="achievement-badge">
                    <i className="fas fa-fire"></i>
                    <span>On Fire</span>
                  </div>
                  <div className="achievement-badge">
                    <i className="fas fa-star"></i>
                    <span>Weekly Star</span>
                  </div>
                  <div className="achievement-badge">
                    <i className="fas fa-crown"></i>
                    <span>Champion</span>
                  </div> */}
                  {/* <div className="achievement-badge">
                    <i className="fas fa-trophy"></i>
                    <span>Top 10</span>
                  </div> */}
                  {userStats.totalShares > 10 && <div className="achievement-badge">
                    <i className="fas fa-medal"></i>
                    <span>Bronze</span>
                  </div>}
                  {userStats.totalShares > 20 && <div className="achievement-badge">
                    <i className="fas fa-medal"></i>
                    <span>Silver</span>
                  </div>}
                  {userStats.totalShares > 30 && <div className="achievement-badge">
                    <i className="fas fa-medal"></i>
                    <span>Gold</span>
                  </div>}
                </div>

              </section>
            </>
          )}
          {activeTab === "office-bearer" && renderOfficeBearerContent()}
        </div>

        {/* Share Referral Modal */}
        {showShareModal && (
          <div className="modal-overlay-fixed" onClick={() => setShowShareModal(false)}>
            <div className="modal-content-fixed share-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn-fixed" onClick={() => setShowShareModal(false)}>
                &times;
              </button>
              <h2 className="share-modal-title">
                <i className="fas fa-share-alt"></i>
                Share Your Referral Link
              </h2>
              <div className="share-modal-body">
                <p className="share-description">Share this link with your friends:</p>
                <div className="referral-link-container">
                  <input
                    type="text"
                    readOnly
                    value={`https://byys-frontend.vercel.app/join?ref=${userData.referralCode}`}
                    className="referral-link-input"
                  />
                  <button
                    className="copy-link-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://byys-frontend.vercel.app/join?ref=${userData.referralCode}`);
                      alert('Link copied to clipboard!');
                    }}
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>

                <div className="social-share-grid">
                  {/* Common Message Text */}
                  <script>
                    const messageText = `BYVS Membership Drive\nJoin Bhartiya Yuva Vidyarthi Sangathan (BYVS) today !!\nGet your Digital Membership ID Card instantly ✅\nShare your ID on WhatsApp, invite friends & climb to the top of the Leaderboard to get Rewards 🏆\nJoin here: https://byys-frontend.vercel.app/join?ref=${userData.referralCode}\nReferral Code: ${userData.referralCode}`;
                  </script>
                  {/* WhatsApp Share Button */}
                  <button
                    className="social-share-btn whatsapp"
                    onClick={() => {
                      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`, '_blank');
                    }}
                  >
                    <i className="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                  </button>

                  {/* Facebook Share Button */}
                  <button
                    className="social-share-btn facebook"
                    onClick={() => {
                      const url = `https://byys-frontend.vercel.app/join?ref=${userData.referralCode}`;
                      const quote = `Join me on BYVS! Get your Digital Membership ID and climb the Leaderboard.`;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`, '_blank', 'width=600,height=400');
                    }}
                  >
                    <i className="fab fa-facebook"></i>
                    <span>Facebook</span>
                  </button>

                  {/* Instagram Share Button (remains a copy action) */}
                  <button
                    className="social-share-btn instagram"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://byys-frontend.vercel.app/join?ref=${userData.referralCode}`);
                      alert('Referral link copied to clipboard. You can now paste it in your Instagram bio or posts.');
                    }}
                  >
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </button>

                  {/* Twitter Share Button */}
                  <button
                    className="social-share-btn twitter"
                    onClick={() => {
                      const twitterMessage = `BYVS Membership Drive%0AJoin Bhartiya Yuva Vidyarthi Sangathan (BYVS) today !!%0AGet your Digital Membership ID Card instantly ✅%0AShare your ID on WhatsApp, invite friends & climb to the top of the Leaderboard to get Rewards 🏆%0AJoin here: https://byys-frontend.vercel.app/join?ref=${userData.referralCode}%0AReferral Code: ${userData.referralCode}`;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterMessage)}`, '_blank', 'width=600,height=400');
                    }}
                  >
                    <i className="fab fa-twitter"></i>
                    <span>Twitter</span>
                  </button>

                  {/* LinkedIn Share Button */}
                  <button
                    className="social-share-btn linkedin"
                    onClick={() => {
                      const url = `https://byys-frontend.vercel.app/join?ref=${userData.referralCode}`;
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
                    }}
                  >
                    <i className="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                  </button>

                  {/* Telegram Share Button */}
                  <button
                    className="social-share-btn telegram"
                    onClick={() => {
                      const message = `BYVS Membership Drive\nJoin Bhartiya Yuva Vidyarthi Sangathan (BYVS) today !!\nGet your Digital Membership ID Card instantly ✅\nShare your ID on WhatsApp, invite friends & climb to the top of the Leaderboard to get Rewards 🏆\nJoin here: https://byys-frontend.vercel.app/join?ref=${userData.referralCode}\nReferral Code: ${userData.referralCode}`;
                      window.open(`https://t.me/share/url?url=${encodeURIComponent(`https://byys-frontend.vercel.app/join?ref=${userData.referralCode}`)}&text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    <i className="fab fa-telegram"></i>
                    <span>Telegram</span>
                  </button>
                </div>

                <div className="share-stats">
                  <p className="stats-text">
                    <i className="fas fa-chart-line"></i>
                    You have earned <strong>{userData.verifiedReferrals}</strong> referrals so far!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Modal with Photo Upload */}
        {showEditModal && (
          <div className="modal-overlay-fixed" onClick={() => setShowEditModal(false)}>
            <div className="modal-content-fixed" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn-fixed" onClick={() => setShowEditModal(false)}>
                &times;
              </button>
              <h2>Edit Profile</h2>
              <form onSubmit={handleEditFormSubmit} className="edit-profile-form">
                {/* Photo Upload Section */}
                <div className="photo-upload-section">
                  <label className="photo-upload-label">
                    <i className="fas fa-camera"></i> Update Profile Photo
                  </label>
                  <label htmlFor="photoUpload" className="photo-upload-button">
                    <i className="fas fa-upload"></i>
                    Choose New Photo
                  </label>
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    className="photo-upload-input"
                    onChange={handlePhotoUpload}
                  />
                  {photoPreview && (
                    <div className="photo-preview">
                      <img src={photoPreview} alt="Preview" />
                      <p className="photo-filename">Photo selected successfully!</p>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  minLength={2}
                  maxLength={100}
                  value={editFormData.fullName || userData.fullName}
                  onChange={handleEditFormChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (+countrycode-number)"
                  pattern="^\+[1-9]\d{1,14}$"
                  value={editFormData.phone}
                  onChange={handleEditFormChange}
                  required
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  min={0}
                  max={120}
                  value={editFormData.age || ""}
                  onChange={handleEditFormChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                  required
                />
                <input
                  type="tel"
                  name="whatsappNumber"
                  placeholder="WhatsApp Number (+countrycode-number)"
                  pattern="^\+[1-9]\d{1,14}$"
                  value={editFormData.whatsappNumber}
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  name="villageTownCity"
                  placeholder="Village / Town / City"
                  maxLength={100}
                  value={editFormData.villageTownCity}
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  name="blockName"
                  placeholder="Block Name"
                  maxLength={100}
                  value={editFormData.blockName}
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  maxLength={100}
                  value={editFormData.district}
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  maxLength={100}
                  value={editFormData.state}
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  name="profession"
                  placeholder="Profession"
                  maxLength={100}
                  value={editFormData.profession}
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  name="institutionName"
                  placeholder="Institution Name"
                  maxLength={255}
                  value={editFormData.institutionName}
                  onChange={handleEditFormChange}
                />
                <input
                  type="text"
                  name="institutionAddress"
                  placeholder="Institution Address"
                  maxLength={255}
                  value={editFormData.institutionAddress}
                  onChange={handleEditFormChange}
                />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="deletePhoto"
                    checked={editFormData.deletePhoto}
                    onChange={handleEditFormChange}
                  />
                  Remove Current Photo
                </label>
                {editFormError && <p className="form-error">{editFormError}</p>}
                <div className="form-actions">
                  <button type="submit" disabled={editIsSubmitting} className="submit-btn">
                    {editIsSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FIXED: ID Card Preview Modal - Single Download Button */}
        {showPreview && (
          <div className="modal-overlay-fixed" onClick={() => setShowPreview(false)}>
            <div className="modal-content-fixed" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn-fixed" onClick={() => setShowPreview(false)}>
                &times;
              </button>
              <h2>ID Card Preview</h2>
              <div ref={targetRef} className="card-preview-container">
                <IdCard user={userData} photo={photoData} />
              </div>
              {/* FIXED: Only one download button, with loading state */}
              {/* <div className="modal-actions">
                <button
                  onClick={toPDF}
                  disabled={pdfLoading}
                  className="download-pdf-btn"
                >
                  {pdfLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Generating PDF...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-download"></i> Download PDF
                    </>
                  )}
                </button>
              </div> */}
            </div>
          </div>
        )}

        {/* FIXED: Certificate Preview Modal - Single Download Button */}
        {showCertificatePreview && (
          <div className="modal-overlay-fixed" onClick={() => setShowCertificatePreview(false)}>
            <div className="modal-content-fixed" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn-fixed" onClick={() => setShowCertificatePreview(false)}>
                &times;
              </button>
              <h2>Certificate Preview</h2>
              <div ref={certificateRef} className="certificate-preview-container">
                <CertificateComponent data={certificateData} />
              </div>
              {/* FIXED: Only one download button, with loading state */}
              {/* <div className="modal-actions">
                <button
                  onClick={toCertificatePDF}
                  disabled={certificatePdfLoading}
                  className="download-pdf-btn"
                >
                  {certificatePdfLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Generating PDF...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-download"></i> Download PDF
                    </>
                  )}
                </button>
              </div> */}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;