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
    try {
        // transform preferences into json
        preferences = preferences.map((preference, index) => ({
            question: index, // question number
            answer: preference // answer to the question
        }));

        console.log("Saving preferences", preferences);


        const response = await axios.post('/auth/preferences', { preferences }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("Preferences saved successfully", response.data);

        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error("Failed to save preferences", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No response received", error.request);
        } else {
            // Something else happened while setting up the request
            console.error("Error", error.message);
        }

        throw error;
    }
};

export const getRecommendations = async (token) => {
    const response = await axios.get(`${API_URL}/videos/recommend`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
