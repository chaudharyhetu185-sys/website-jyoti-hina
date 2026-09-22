import axios from 'axios';
import { FOUNDERS_DATA } from '../config/foundersConfig';
import { MOCK_PROJECTS } from '../data/mockProjects';
import { MOCK_REVIEWS } from '../data/mockReviews';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

export const fetchFounders = async () => {
  try {
    const response = await apiClient.get('/founders');
    if (response.data && response.data.data) {
      return { data: response.data.data, isMock: false };
    }
    return { data: FOUNDERS_DATA, isMock: true };
  } catch (error) {
    console.warn('[API Client] Backend unreachable for founders, using config fallback:', error.message);
    return { data: FOUNDERS_DATA, isMock: true };
  }
};

export const fetchProjects = async (category = 'All') => {
  try {
    const url = category && category !== 'All' ? `/projects?category=${encodeURIComponent(category)}` : '/projects';
    const response = await apiClient.get(url);
    if (response.data && response.data.data) {
      return { data: response.data.data, isMock: false };
    }
    const filteredMock = category && category !== 'All'
      ? MOCK_PROJECTS.filter(p => p.category.toLowerCase() === category.toLowerCase())
      : MOCK_PROJECTS;
    return { data: filteredMock, isMock: true };
  } catch (error) {
    console.warn('[API Client] Backend unreachable for projects, using fallback data:', error.message);
    const filteredMock = category && category !== 'All'
      ? MOCK_PROJECTS.filter(p => p.category.toLowerCase() === category.toLowerCase())
      : MOCK_PROJECTS;
    return { data: filteredMock, isMock: true };
  }
};

export const fetchReviews = async () => {
  try {
    const response = await apiClient.get('/reviews');
    if (response.data && response.data.data) {
      return { data: response.data.data, isMock: false };
    }
    return { data: MOCK_REVIEWS, isMock: true };
  } catch (error) {
    console.warn('[API Client] Backend unreachable for reviews, using fallback data:', error.message);
    return { data: MOCK_REVIEWS, isMock: true };
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/contact', formData, {
      timeout: 30000 // Allow up to 30 seconds for SMTP email delivery
    });
    return response.data;
  } catch (error) {
    console.error('[API Client] Contact form submit error:', error.message);
    // Timeout error handling
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Sending took longer than expected due to network latency. Please check your connection and try again.');
    }
    // Extract server-side message if available (validation errors, email errors, etc.)
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Something went wrong while sending your message. Please try again.');
    }
    // Network/connection error
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }
};
