import axios from 'axios';

const API_BASE_URL = 'https://byys-backend.onrender.com';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getLeaderboardData = async (type, page = 0, size = 20) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/referrals/leaderboard/${type}?page=${page}&size=${size}`,
    );
    return response.data; // Access the 'content' array from paginated response
  } catch (error) {
    console.error(`Error fetching ${type} leaderboard:`, error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/otp/me`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getReferralHistory = async (page = 0, size = 20) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/referrals/history?page=${page}&size=${size}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching referral history:', error);
    throw error;
  }
};

export const getShareLink = async (baseUrl = 'https://localhost:5173/register', source) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/referrals/share-link?baseUrl=${baseUrl}${source ? `&source=${source}` : ''}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error getting share link:', error);
    throw error;
  }
};

export const trackShareEvent = async (source) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/referrals/track/share${source ? `?source=${source}` : ''}`, {}, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error tracking share event:', error);
    throw error;
  }
};
