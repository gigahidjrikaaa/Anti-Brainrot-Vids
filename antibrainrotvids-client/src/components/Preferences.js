import React, { useState } from 'react';
import { setPreferences } from '../services/api';

const Preferences = ({ token }) => {
    const [preferences, setPreferencesInput] = useState('');

    const handleSave = async () => {
        try {
            await setPreferences(token, preferences);
            alert('Preferences saved successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to save preferences');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-background-light p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Preferences</h2>
            <textarea
                value={preferences}
                onChange={(e) => setPreferencesInput(e.target.value)}
                placeholder="Enter your preferences"
                className="w-full p-2 mb-4 bg-background-dark text-white rounded-lg"
            />
            <button onClick={handleSave} className="w-full p-2 bg-futuristic-blue rounded-lg hover:bg-dark-blue">
                Save Preferences
            </button>
        </div>
    );
};

export default Preferences;
