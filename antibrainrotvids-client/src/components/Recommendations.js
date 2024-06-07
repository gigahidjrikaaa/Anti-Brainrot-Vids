import React, { useState, useEffect } from 'react';
import { getRecommendations } from '../services/api';

const Recommendations = ({ token }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await getRecommendations(token);
                setVideos(data);
            } catch (err) {
                console.error(err);
                alert('Fetching recommendations failed');
            }
        };

        fetchRecommendations();
    }, [token]);

    return (
        <div>
            <h2>Recommended Videos</h2>
            <ul>
                {videos.map(video => (
                    <li key={video.id}>
                        <a href={video.url} target="_blank" rel="noopener noreferrer">{video.title}</a>
                        <p>{video.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;
