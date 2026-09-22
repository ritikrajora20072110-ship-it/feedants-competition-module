import { Platform } from 'react-native';

// For mobile emulator / web / physical device support:
// Android Emulator uses 10.0.2.2, iOS Simulator & Web use localhost
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5001/api';
  }
  return 'http://localhost:5001/api';
};

export const API_BASE_URL = getBaseUrl();

export const api = {
  /**
   * Fetch all competitions
   */
  async getCompetitions() {
    try {
      const res = await fetch(`${API_BASE_URL}/competitions`);
      if (!res.ok) throw new Error('Failed to fetch competitions');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('API error, using fallback:', err.message);
      return [];
    }
  },

  /**
   * Fetch single competition details with user state
   */
  async getCompetitionDetails(idOrSlug, userId = null) {
    try {
      const url = userId
        ? `${API_BASE_URL}/competitions/${idOrSlug}?userId=${userId}`
        : `${API_BASE_URL}/competitions/${idOrSlug}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch competition details');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('API getCompetitionDetails error:', err.message);
      throw err;
    }
  },

  /**
   * Concurrency-safe registration
   */
  async register(competitionId, userId = null, paymentDetails = {}) {
    const res = await fetch(`${API_BASE_URL}/competitions/${competitionId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        paymentId: paymentDetails.paymentId || `pay_client_${Date.now()}`,
        paymentGateway: paymentDetails.paymentGateway || 'Razorpay',
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data.error || 'Registration failed');
      error.code = data.code;
      throw error;
    }
    return data.data;
  },

  /**
   * Upload / Submit entry
   */
  async submitEntry(competitionId, submissionData) {
    const res = await fetch(`${API_BASE_URL}/competitions/${competitionId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Submission upload failed');
    }
    return data.data;
  },

  /**
   * Fetch reviews
   */
  async getReviews() {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('API getReviews error:', err.message);
      return [];
    }
  },

  /**
   * Reseed database for quick testing
   */
  async reseed() {
    const res = await fetch(`${API_BASE_URL}/seed`, {
      method: 'POST',
    });
    return res.json();
  },
};
