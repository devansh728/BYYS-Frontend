import React, { useState, useEffect } from 'react';
import './AdminDashBoard.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [adminData, setAdminData] = useState(null); // ✅ NEW: Admin profile data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('X-User-Role');

    if (!token || role !== 'ADMIN') {
      navigate('/login');
      return;
    }

    // Load dummy data instead of API calls
    fetchProfileData();
    fetchAdminData();
  }, [navigate]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/auth/otp/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${data.error || response.statusText}`);
      }
      setAdminData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      // Fetch applications
      const appsResponse = await fetch('http://localhost:8080/api/admin/office-bearer-applications?approved=false', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const appsData = await appsResponse.json();
      if (!appsResponse.ok) {
        throw new Error(`Server responded with ${appsResponse.status}: ${appsData.error || appsResponse.statusText}`);
      }
      setApplications(appsData.content);

      // Fetch tasks (you'll need to implement this endpoint)
      const tasksResponse = await fetch('http://localhost:8080/api/admin/all-tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const tasksData = await tasksResponse.json();
      setTasks(tasksData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveApplication = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/office-bearer-applications/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (response.ok) {
        fetchAdminData(); // Refresh data
        alert(`Application approved! Email sent to ${result.email}`);
      } else {
        throw new Error(result.message || 'Failed to approve');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      const newTask = await response.json();
      if (response.ok) {
        setTasks([...tasks, newTask]);
        return newTask;
      } else {
        throw new Error('Failed to create task');
      }
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="admin-dashboard">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading Admin Dashboard...</p>
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
        <div className="admin-dashboard">
          <div className="error">
            <i className="fas fa-exclamation-triangle"></i>
            <p>Error: {error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="admin-dashboard">
        <div className="admin-header">
          <div className="header-content">
            <div className="logo-section">
              <img src="/assets/logo.jpg" alt="BYVS Logo" className="admin-logo" />
              <div className="header-text">
                <h1>Admin Dashboard</h1>
                <p>Bharatiya Yuva Vidyarthi Sangathan</p>
              </div>
            </div>

            {/* ✅ NEW: Admin Profile Section */}
            {adminData && (
              <div className="admin-profile-section">
                <div className="admin-profile-card">
                  <div className="admin-avatar">
                    {adminData.profileImage ? (
                      <img src={adminData.profileImage} alt="Admin Avatar" />
                    ) : (
                      <i className="fas fa-user-shield"></i>
                    )}
                    <div className="online-status"></div>
                  </div>
                  <div className="admin-info">
                    <h3>{adminData.fullName}</h3>
                    <span className="admin-role">Admin</span>
                    <div className="admin-contact">
                      <div className="contact-item">
                        <i className="fas fa-envelope"></i>
                        <span>{adminData.email}</span>
                      </div>
                      <div className="contact-item">
                        <i className="fas fa-phone"></i>
                        <span>{adminData.phone}</span>
                      </div>
                      <div className="contact-item">
                        <i className="fas fa-clock"></i>
                        <span>Last login: {formatDate(adminData.lastLogin)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="admin-actions">
                    <button className="profile-btn" title="Edit Profile">
                      <i className="fas fa-user-edit"></i>
                    </button>
                    <button className="settings-btn" title="Settings">
                      <i className="fas fa-cog"></i>
                    </button>
                    <button className="logout-btn" title="Logout" onClick={() => {
                      localStorage.removeItem('authToken');
                      localStorage.removeItem('X-User-Role');
                      navigate('/login');
                    }}>
                      <i className="fas fa-sign-out-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="admin-stats">
              <div className="stat-card">
                <span className="stat-number">{applications.length}</span>
                <span className="stat-label">Pending Applications</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{tasks.length}</span>
                <span className="stat-label">Active Tasks</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{applications.filter(app => app.approved).length}</span>
                <span className="stat-label">Approved Today</span>
              </div>
            </div>
          </div>

          <div className="admin-tabs">
            <button
              className={activeTab === 'applications' ? 'active' : ''}
              onClick={() => setActiveTab('applications')}
            >
              <i className="fas fa-users"></i>
              Applications
            </button>
            <button
              className={activeTab === 'tasks' ? 'active' : ''}
              onClick={() => setActiveTab('tasks')}
            >
              <i className="fas fa-tasks"></i>
              Task Management
            </button>
            <button
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user-shield"></i>
              Admin Profile
            </button>
          </div>
        </div>

        <div className="admin-content">
          {/* ✅ NEW: Admin Profile Tab */}
          {activeTab === 'profile' && adminData && (
            <div className="admin-profile-section-detailed">
              <div className="section-header">
                <h2><i className="fas fa-user-shield"></i> Admin Profile</h2>
                <button className="edit-profile-btn">
                  <i className="fas fa-edit"></i>
                  Edit Profile
                </button>
              </div>

              <div className="profile-details-grid">
                <div className="profile-card">
                  <div className="profile-card-header">
                    <i className="fas fa-user"></i>
                    <h3>Personal Information</h3>
                  </div>
                  <div className="profile-card-content">
                    <div className="detail-row">
                      <span className="label">Full Name:</span>
                      <span className="value">{adminData.fullName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Email Address:</span>
                      <span className="value">{adminData.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Phone Number:</span>
                      <span className="value">{adminData.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Role:</span>
                      <span className="value role-badge">Admin</span>
                    </div>
                  </div>
                </div>

                <div className="profile-card">
                  <div className="profile-card-header">
                    <i className="fas fa-shield-alt"></i>
                    <h3>Access & Permissions</h3>
                  </div>
                  <div className="profile-card-content">
                    <div className="detail-row">
                      <span className="label">Joined Date:</span>
                      <span className="value">{formatDate(adminData.joinedDate)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Last Login:</span>
                      <span className="value">{formatDate(adminData.lastLogin)}</span>
                    </div>
                    {/* <div className="detail-row full-width">
                      <span className="label">Permissions:</span>
                      <div className="permissions-list">
                        {adminData.permissions.map((permission, index) => (
                          <span key={index} className="permission-tag">
                            <i className="fas fa-check"></i>
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="profile-card activity-card">
                  <div className="profile-card-header">
                    <i className="fas fa-chart-line"></i>
                    <h3>Admin Activity</h3>
                  </div>
                  <div className="profile-card-content">
                    <div className="activity-stats">
                      <div className="activity-stat">
                        <i className="fas fa-check-circle"></i>
                        <div>
                          <span className="stat-number">{applications.filter(app => app.approved).length}</span>
                          <span className="stat-label">Applications Approved</span>
                        </div>
                      </div>
                      <div className="activity-stat">
                        <i className="fas fa-plus-circle"></i>
                        <div>
                          <span className="stat-number">{tasks.length}</span>
                          <span className="stat-label">Tasks Created</span>
                        </div>
                      </div>
                      <div className="activity-stat">
                        <i className="fas fa-clock"></i>
                        <div>
                          <span className="stat-number">24/7</span>
                          <span className="stat-label">System Access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="applications-section">
              <div className="section-header">
                <h2><i className="fas fa-user-check"></i> Office Bearer Applications</h2>
                <span className="section-count">{applications.filter(app => !app.approved).length} Pending</span>
              </div>

              <div className="applications-grid">
                {applications.length > 0 ? (
                  applications.map(app => (
                    <div key={app.id} className={`application-card ${app.approved ? 'approved' : 'pending'}`}>
                      <div className="card-header">
                        <div className="applicant-info">
                          <h3>{app.user.fullName}</h3>
                          <span className={`status-badge ${app.approved ? 'approved' : 'pending'}`}>
                            {app.approved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        <div className="application-position">
                          <span className="position-tag">{app.position}</span>
                        </div>
                      </div>

                      <div className="card-details">
                        <div className="detail-item">
                          <i className="fas fa-phone"></i>
                          <span>{app.user.phone}</span>
                        </div>
                        <div className="detail-item">
                          <i className="fas fa-envelope"></i>
                          <span>{app.user.email}</span>
                        </div>
                        <div className="detail-item">
                          <i className="fas fa-map-marker-alt"></i>
                          <span>{app.district}, {app.state}</span>
                        </div>
                        <div className="detail-item">
                          <i className="fas fa-calendar"></i>
                          <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="detail-item experience">
                          <i className="fas fa-briefcase"></i>
                          <span>{app.experience}</span>
                        </div>
                      </div>

                      {!app.approved && (
                        <div className="card-actions">
                          <button
                            onClick={() => approveApplication(app.id)}
                            className="approve-btn"
                          >
                            <i className="fas fa-check"></i>
                            Approve Application
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-inbox"></i>
                    <p>No applications found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="tasks-section">
              <div className="section-header">
                <h2><i className="fas fa-clipboard-list"></i> Task Management</h2>
                <span className="section-count">{tasks.filter(task => task.status !== 'Completed').length} Active</span>
              </div>

              <TaskForm onCreate={createTask} />

              <div className="tasks-grid">
                {tasks.length > 0 ? (
                  tasks.map(task => (
                    <div key={task.id} className={`task-card ${task.status.toLowerCase().replace(' ', '-')}`}>
                      <div className="task-header">
                        <div className="task-title-section">
                          <h3>{task.title}</h3>
                          <div className="task-tags">
                            <span className={`priority-tag ${task.priority?.toLowerCase()}`}>
                              {task.priority}
                            </span>
                            <span className="category-tag">
                              {task.category}
                            </span>
                          </div>
                        </div>
                        <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                          {task.status}
                        </span>
                      </div>

                      <div className="task-description">
                        <p>{task.description}</p>
                      </div>

                      <div className="task-details">
                        <div className="task-detail-item">
                          <i className="fas fa-coins"></i>
                          <span>{task.rewardCoins} coins</span>
                        </div>
                        <div className="task-detail-item">
                          <i className="fas fa-user"></i>
                          <span>{task.assignedTo.fullName}</span>
                        </div>
                        <div className="task-detail-item">
                          <i className="fas fa-calendar-alt"></i>
                          <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-tasks"></i>
                    <p>No tasks created yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const TaskForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rewardCoins: 10,
    assigneeId: '',
    deadline: '',
    priority: 'Medium',
    category: 'General'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...formData,
      rewardCoins: parseInt(formData.rewardCoins),
      assigneeId: parseInt(formData.assigneeId),
      deadline: new Date(formData.deadline).toISOString()
    });
    setFormData({
      title: '',
      description: '',
      rewardCoins: 10,
      assigneeId: '',
      deadline: '',
      priority: 'Medium',
      category: 'General'
    });
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-header">
          <h3><i className="fas fa-plus-circle"></i> Create New Task</h3>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label><i className="fas fa-heading"></i> Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label><i className="fas fa-coins"></i> Reward Coins</label>
            <input
              type="number"
              min="1"
              value={formData.rewardCoins}
              onChange={(e) => setFormData({ ...formData, rewardCoins: e.target.value })}
              required
            />
          </div>

          <div className="form-group full-width">
            <label><i className="fas fa-align-left"></i> Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label><i className="fas fa-user-tag"></i> Assignee ID</label>
            <input
              type="number"
              value={formData.assigneeId}
              onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
              placeholder="Enter user ID"
              required
            />
          </div>

          <div className="form-group">
            <label><i className="fas fa-calendar"></i> Deadline</label>
            <input
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label><i className="fas fa-exclamation-circle"></i> Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label><i className="fas fa-tag"></i> Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="General">General</option>
              <option value="Cultural">Cultural</option>
              <option value="Education">Education</option>
              <option value="Service">Service</option>
              <option value="Outreach">Outreach</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <i className="fas fa-plus"></i>
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
