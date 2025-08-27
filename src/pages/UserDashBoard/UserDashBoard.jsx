import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashBoard.css";
import Header from "../../components/Header/Header"; // Adjust path as needed
import Footer from "../../components/Footer/Footer"; // Adjust path as needed
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
  const { toPDF, targetRef: pdfTargetRef } = usePDF({
    filename: "byvs_id_card.pdf",
    page: { format: "A3", orientation: "portrait" },
  });
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);
  const certificateRef = useRef();
  const { toPDF: toCertificatePDF, targetRef: certificatePdfTargetRef } = usePDF({
    filename: "byvs_membership_certificate.pdf",
    page: { format: "A4", orientation: "landscape" },
  });
  // States for Edit Profile Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);


  const handleDownloadClick = () => {
    toPDF();
  };
  const handleCertificateDownloadClick = () => {
    if (applicationStatus === 'APPROVED') {
      setShowCertificatePreview(true);
      toCertificatePDF();
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
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'office-bearer' && !applicationStatus) {
      fetchApplicationStatus();
    }
  }, [activeTab, applicationStatus]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/otp/me`, {
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

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/otp/user/photo`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/office-bearer/status`, {
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
            block: 'Block-A',
            district: userData.district,
            state: userData.state,
            regNo: '66/22', // This can be static or dynamic from API
            dateOfIssue: '2025-08-19', // Set current date
          });
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/office-bearer/get-tasks`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/office-bearer/apply`, {
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

  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const ShareResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/referrals/userStats`, {
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

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/otp`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");

      alert("Profile updated successfully!");
      setShowEditModal(false);
      fetchUserData();
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Modal for Edit Profile
  const renderEditProfileModal = () => {
    if (!showEditModal) return null;
    return (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-start z-50">
        <div
          className="bg-white w-full max-w-3xl rounded-lg shadow-xl p-6 relative overflow-y-auto max-h-[90vh] mt-4"
          style={{ marginTop: "120px" }} // Adjust based on header height
        >
          <button
            onClick={() => setShowEditModal(false)}
            className="absolute top-3 right-3 text-2xl font-bold"
            aria-label="Close Edit Profile"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-6">Edit Profile</h2>
          {updateError && <p className="text-red-500 mb-3">Error: {updateError}</p>}
          <form onSubmit={handleProfileSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                name="age"
                value={profileForm.age}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="whatsappNumber">WhatsApp Number</label>
              <input
                id="whatsappNumber"
                type="text"
                name="whatsappNumber"
                value={profileForm.whatsappNumber}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="villageTownCity">Village/Town/City</label>
              <input
                id="villageTownCity"
                type="text"
                name="villageTownCity"
                value={profileForm.villageTownCity}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="blockName">Block Name</label>
              <input
                id="blockName"
                type="text"
                name="blockName"
                value={profileForm.blockName}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="district">District</label>
              <input
                id="district"
                type="text"
                name="district"
                value={profileForm.district}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                name="state"
                value={profileForm.state}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="profession">Profession</label>
              <input
                id="profession"
                type="text"
                name="profession"
                value={profileForm.profession}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="institutionName">Institution Name</label>
              <input
                id="institutionName"
                type="text"
                name="institutionName"
                value={profileForm.institutionName}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="institutionAddress">Institution Address</label>
              <input
                id="institutionAddress"
                type="text"
                name="institutionAddress"
                value={profileForm.institutionAddress}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="flex items-center gap-2" htmlFor="deletePhoto">
                <input
                  id="deletePhoto"
                  type="checkbox"
                  name="deletePhoto"
                  checked={profileForm.deletePhoto}
                  onChange={handleProfileChange}
                />
                Delete Profile Photo
              </label>
            </div>
            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
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
      <div className="profile-page">
        <header className="profile-header">
          <div className="header-content">
            <div className="header-icon">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="header-text">
              <h1>My BYVS Dashboard</h1>
              <p>Your complete member dashboard and information center</p>
            </div>
          </div>
        </header>

        <nav className="dashboard-tabs">
          <button className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </button>
          <button className={`tab-button ${activeTab === 'office-bearer' ? 'active' : ''}`} onClick={() => { setActiveTab('office-bearer'); fetchApplicationStatus(); }}>
            <i className="fas fa-briefcase"></i>
            <span>Office Bearer</span>
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <>
              {/* Profile Info */}
              <section className="profile-info">
                <div className="profile-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <h2 className="profile-name">{userData.fullName}</h2>
                <p className="profile-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {userData.district}, {userData.state}, India
                </p>
                <p className="profile-id">
                  <i className="fas fa-id-card"></i>
                  Member ID: <strong>{userData.membershipId}</strong>
                </p>
                <p className="profile-joined">
                  <i className="fas fa-calendar-plus"></i>
                  <strong>Joined:</strong> {formatDate(userData.joinedDate)}
                </p>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="mt-4 bg-green-600 text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-green-700"
                >
                  <i className="fas fa-edit"></i> Edit Profile
                </button>

                {renderEditProfileModal()}

              </section>



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
                    <span className="stat-number">{userStats.currentRank || 'N/A'}</span>
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
                      <p>{userData.email || 'Not provided'}</p>
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

              {/* Referral Code */}
              <section className="info-section referral-section">
                <h2>
                  <i className="fas fa-users"></i>
                  Your Referral Code
                </h2>
                <p>Share this code with friends to invite them to BYVS</p>
                <div className="referral-code-container">
                  <div className="referral-code">{userData.referralCode}</div>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(userData.referralCode)}>
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
                <div className="referral-stats">
                  <i className="fas fa-user-friends"></i>
                  <span>Referrals Joined: <strong>{userData.verifiedReferrals}</strong> members</span>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    className="text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                    style={{ backgroundColor: '#FF8C00', border: 'none' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#FF6B00'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#FF8C00'}
                    onClick={() => document.getElementById('referral-modal').classList.remove('hidden')}
                  >
                    <i className="fas fa-share-alt mr-2"></i>
                    Share Referral Link
                  </button>
                </div>

                {/* Referral Modal */}
                <div id="referral-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                    {/* Modal Header */}
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                    
                      <h3 className="text-lg font-semibold">Share Your Referral Link</h3>
                      <button
                        onClick={() => document.getElementById('referral-modal').classList.add('hidden')}
                        className="text-white hover:text-blue-200"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-4">
                      <p className="text-gray-600 mb-2">Share this link with your friends:</p>
                      <div className="flex items-center mb-6">
                        <input
                          type="text"
                          readOnly
                          value={`${process.env.REACT_APP_API_BASE_URL_FRONTEND}/join?ref=${userData.referralCode}`}
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
                        />
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-r-lg"
                          onClick={() => navigator.clipboard.writeText(`${process.env.REACT_APP_API_BASE_URL_FRONTEND}/join?ref=${userData.referralCode}`)}
                        >
                          <i className="fas fa-copy"></i>
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {/* WhatsApp Share Button */}
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                          onClick={() => {
                            const message = `Join me on BYVS using my referral link: ${process.env.REACT_APP_API_BASE_URL_FRONTEND}/join?ref=${userData.referralCode}`;
                            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
                          }}
                        >
                          <i className="fab fa-whatsapp text-xl mb-1"></i>
                          <span className="text-xs">WhatsApp</span>
                        </button>

                        {/* Facebook Share Button */}
                        <button
                          className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                          onClick={() => {
                            const url = `${process.env.REACT_APP_API_BASE_URL_FRONTEND}/join?ref=${userData.referralCode}`;
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
                          }}
                        >
                          <i className="fab fa-facebook text-xl mb-1"></i>
                          <span className="text-xs">Facebook</span>
                        </button>

                        {/* Instagram Share Button */}
                        <button
                          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                          onClick={() => {
                            // Instagram doesn't have a direct share API, so we'll copy to clipboard
                            navigator.clipboard.writeText(`${process.env.REACT_APP_API_BASE_URL_FRONTEND}/join?ref=${userData.referralCode}`);
                            alert('Referral link copied to clipboard. You can now paste it in your Instagram bio or posts.');
                          }}
                        >
                          <i className="fab fa-instagram text-xl mb-1"></i>
                          <span className="text-xs">Instagram</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Downloads */}
              <section className="info-section downloads-section">
                <h2>
                  <i className="fas fa-download"></i>
                  My Downloads
                </h2>
                <div className="downloads-grid">
                  <div className="download-item" onClick={() => setShowCertificatePreview(true)}>
                    <i className="fas fa-certificate"></i>
                    <div>
                      <strong>BYVS Membership Certificate</strong>
                      <p>Official membership certificate in PDF format</p>
                    </div>
                  </div>
                  <div className="download-item" onClick={() => setShowPreview(true)} >
                    <i className="fas fa-certificate"></i>
                    <div>
                      <strong>BYVS ID-CARD</strong>
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

              {showPreview && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto relative overflow-hidden">
                    {/* Close Button - Positioned absolutely at top-right */}
                    <button
                      className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-2xl font-bold z-10"
                      onClick={() => setShowPreview(false)}
                    >
                      &times;
                    </button>

                    {/* Modal Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4 text-center">ID Card Preview</h2>
                      <div className="flex flex-col items-center">
                        {/* ID Card Preview */}
                        <div ref={targetRef} className="mb-6">
                          <IdCard user={userData} photo={photoData} />
                        </div>

                        {/* Download Button - Centered
                        <button
                          onClick={downloadIdCardPDF}
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all flex items-center gap-2"
                        >
                          <i className="fas fa-download"></i>
                          Download ID Card (PDF)
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {showCertificatePreview && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full relative">
                    <button
                      className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-2xl font-bold"
                      onClick={() => setShowCertificatePreview(false)}
                    >
                      &times;
                    </button>
                    <h2 className="text-xl font-bold mb-4 text-center">
                      Certificate Preview
                    </h2>
                    <div ref={certificateRef} className="flex justify-center">
                      {/* You will need to create and import a Certificate component here */}
                      <CertificateComponent data={certificateData} />
                    </div>
                    {/* <div className="mt-6 flex justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={toCertificatePDF}
                      >
                        Download Certificate (PDF)
                      </button>
                    </div> */}
                  </div>
                </div>
              )}

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
                  { userStats.totalShares > 1 && (
                    <div className="achievement-badge">
                      <i className="fas fa-share"></i>
                      <span>First Share</span>
                    </div>
                  )}
                  {/* { userStats.totalPosts > 5 && (
                    <div className="achievement-badge">
                      <i className="fas fa-fire"></i>
                      <span>On Fire</span>
                    </div>
                  )}
                  { userStats.totalPosts > 10 && (
                    <div className="achievement-badge">
                      <i className="fas fa-star"></i>
                      <span>Weekly Star</span>
                    </div>
                  )}
                  { userStats.totalPosts > 20 && (
                    <div className="achievement-badge">
                      <i className="fas fa-crown"></i>
                    <span>Champion</span>
                  </div>
                  )} */}
                  { userStats.totalShares > 10 && (
                    <div className="achievement-badge">
                      <i className="fas fa-trophy"></i>
                      <span>Bronze Trophy</span>
                    </div>
                  )}
                  { userStats.totalShares > 20 && (
                    <div className="achievement-badge">
                      <i className="fas fa-users"></i>
                      <span>Silver Member</span>
                    </div>
                  )}
                  { userStats.totalShares > 30 && (
                    <div className="achievement-badge">
                      <i className="fas fa-users"></i>
                      <span>Gold Member</span>
                    </div>
                  )}
                  { userStats.totalShares > 50 && (
                    <div className="achievement-badge">
                      <i className="fas fa-gem"></i>
                      <span>Legend</span>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
          {activeTab === 'office-bearer' && renderOfficeBearerContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
