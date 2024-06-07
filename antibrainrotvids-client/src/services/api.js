import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, { username, password });
    return response.data;
};

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
};

export const setPreferences = async (token, preferences) => {
    const response = await axios.post(`${API_URL}/auth/preferences`, { preferences }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const getRecommendations = async (token) => {
    const response = await axios.get(`${API_URL}/videos/recommend`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
