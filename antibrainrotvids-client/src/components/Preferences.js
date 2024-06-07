import React, { useState } from 'react';
import { setPreferences } from '../services/api';

const Preferences = ({ token }) => {
    const [preferences, setPreferencesState] = useState('');

    const handleSavePreferences = async () => {
        try {
            await setPreferences(token, preferences);
            alert('Preferences saved successfully!');
        } catch (err) {
            console.error(err);
            alert('Saving preferences failed');
        }
    };

    return (
        <div>
            <h2>Set Preferences</h2>
            <textarea
                value={preferences}
                onChange={(e) => setPreferencesState(e.target.value)}
                placeholder="Enter your preferences in JSON format"
            />
            <button onClick={handleSavePreferences}>Save Preferences</button>
        </div>
    );
};

export default Preferences;
