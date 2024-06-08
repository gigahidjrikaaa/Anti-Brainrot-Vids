import React, { useEffect, useState } from 'react';
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
                alert('Failed to fetch recommendations');
            }
        };

        fetchRecommendations();
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto bg-background-light p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Recommendations</h2>
            <ul>
                {videos.map((video, index) => (
                    <li key={index} className="mb-4">
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-futuristic-blue hover:underline">
                            {video.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;
