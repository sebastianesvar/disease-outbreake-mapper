import axios from 'axios';

const API_BASE_URL = 'http://localhost:8002/api/v1';

export const getAllOutbreaks = async (disease = null, severity = null) => {
  try {
    let url = `${API_BASE_URL}/outbreaks`;
    const params = new URLSearchParams();
    
    if (disease) params.append('disease', disease);
    if (severity) params.append('severity', severity);
    
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching outbreaks';
  }
};

export const getStatistics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching statistics';
  }
};

export const getDiseaseStatistics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/by-disease`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching disease statistics';
  }
};

export const getClusters = async (radiusKm = 500) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clusters?radius_km=${radiusKm}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching clusters';
  }
};

export const getTimeline = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/timeline`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching timeline';
  }
};

export const getAvailableDiseases = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diseases`);
    return response.data.diseases;
  } catch (error) {
    throw error.response?.data?.detail || 'Error fetching diseases';
  }
};
