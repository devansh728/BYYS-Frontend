import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'; // Adjust path as needed
import Footer from '../../components/Footer/Footer'; // Adjust path as needed
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('mobile'); // mobile → otp → success
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      alert('You are already logged in.');
      navigate("/home");
    }
  }, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    try {
      const phoneNumber = `+91${mobile}`;
      const checkUserResponse = await fetch(`http://localhost:8080/auth/otp/check-user?phone=${encodeURIComponent(phoneNumber)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!checkUserResponse.ok) {
        const errorData = await checkUserResponse.json();
        throw new Error(errorData.message || 'Failed to check user status');
      }

      const userData = await checkUserResponse.json();
      setUserExists(userData.exists);

      if(!userData.exists) {
        alert('No user found with this number. Please sign up first.');
        navigate('/join-us'); // Redirect to join page if user does not exist
        return;
      }

      // Then send OTP
      const otpResponse = await fetch('http://localhost:8080/auth/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (!otpResponse.ok) {
        const errorData = await otpResponse.json();
        if (otpResponse.status === 429) {
          setError(errorData.message || 'Too many requests. Please try again later.');
        } else {
          setError(errorData.message || 'Failed to send OTP. Please try again.');
        }
        return;
      }

      setStep('otp');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const phoneNumber = `+91${mobile}`;

      const response = await fetch('http://localhost:8080/auth/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          otp: otp
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Failed to verify OTP.');
        return;
      }

      const data = await response.json();
      const userRole = response.headers.get('X-User-Role');
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('X-User-Role', userRole);

      setStep('success');
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetLogin = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('X-User-Role');
    setStep('mobile');
    setMobile('');
    setOtp('');
  };

  return (
    <>
      <Header />

      <main className="login-page">
        {/* Hero Spacer - Prevents header overlap */}
        <div className="login-spacer"></div>

        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <div className="login-logo">
                <img src="/assests/logo.jpg" alt="BYVS Logo" />
              </div>
              <h1 className="login-title">BYVS Member Login</h1>
              <p className="login-subtitle">
                {step === 'mobile' && 'Login to access your member dashboard or signup to join our family'}
                {step === 'otp' && `We've sent a 6-digit OTP to +91-${mobile}`}
                {step === 'success' && 'Welcome to the BYVS family!'}
              </p>
            </div>

            <div className="login-content">
              {step === 'mobile' && (
                <form onSubmit={sendOtp} className="login-form">
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <div className="input-group">
                      <span className="country-code">+91</span>
                      <input
                        id="mobile"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="login-btn primary" disabled={isLoading}>
                    <i className="fas fa-paper-plane"></i>
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </button>

                  <div className="login-footer">
                    <p>Don't have an account? <a href="/join">Join BYVS</a></p>
                  </div>
                </form>
              )}

              {step === 'otp' && (
                <form onSubmit={verifyOtp} className="login-form">
                  <div className="form-group">
                    <label htmlFor="otp">Enter OTP</label>
                    <input
                      id="otp"
                      type="text"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      maxLength={6}
                      required
                    />
                    <small className="form-text">
                      OTP sent to +91-{mobile}
                    </small>
                  </div>

                  <div className="button-group">
                    <button type="submit" className="login-btn primary" disabled={isLoading}>
                      <i className="fas fa-check"></i>
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button
                      type="button"
                      className="login-btn secondary"
                      onClick={() => setStep('mobile')}
                      disabled={isLoading}
                    >
                      <i className="fas fa-arrow-left"></i>
                      Back
                    </button>
                  </div>

                  <div className="resend-otp">
                    <p>Didn't receive OTP? <button type="button" className="link-btn">Resend</button></p>
                  </div>
                </form>
              )}

              {step === 'success' && (
                <div className="success-container">
                  <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h2 className="success-title">Successfully Logged In!</h2>
                  <p className="success-message">
                    Welcome back to BYVS! Redirecting to your dashboard...
                  </p>

                  <div className="success-actions">
                    <button className="login-btn primary" onClick={() => navigate('/home')}>
                      <i className="fas fa-tachometer-alt"></i>
                      Go to Dashboard
                    </button>
                    <button
                      className="login-btn secondary"
                      onClick={resetLogin}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
