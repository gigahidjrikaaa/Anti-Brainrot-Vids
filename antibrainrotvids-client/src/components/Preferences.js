import React, { useState } from 'react';
import { setPreferences } from '../services/api';

const surveyQuestions = [
    {
        question: "Which field do you find most interesting?",
        options: ["Mechanical", "Electrical", "Civil", "Software"]
    },
    {
        question: "Do you enjoy working with electronics?",
        options: ["Yes", "No"]
    },
    {
        question: "Do you prefer working outdoors?",
        options: ["Yes", "No"]
    },
    {
        question: "Do you have a knack for programming?",
        options: ["Yes", "No"]
    },
    {
        question: "Do you like designing and building structures?",
        options: ["Yes", "No"]
    },
    {
        question: "Are you interested in automotive technology?",
        options: ["Yes", "No"]
    },
    {
        question: "Do you enjoy solving complex mathematical problems?",
        options: ["Yes", "No"]
    },
    {
        question: "Do you have an interest in aerospace technology?",
        options: ["Yes", "No"]
    },
    {
        question: "Do you like working with renewable energy systems?",
        options: ["Yes", "No"]
    },
    {
        question: "Are you interested in biotechnology?",
        options: ["Yes", "No"]
    }
];

const Preferences = ({ token }) => {
    const [responses, setResponses] = useState(Array(surveyQuestions.length).fill(null));

    const handleOptionChange = (questionIndex, option) => {
        const newResponses = [...responses];
        newResponses[questionIndex] = option;
        setResponses(newResponses);
    };

    const handleSave = async () => {
        try {
            await setPreferences(token, responses);
            alert('Preferences saved successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to save preferences');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-background-light p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Preferences Survey</h2>
            <form>
                {surveyQuestions.map((q, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="mb-2">{q.question}</h3>
                        {q.options.map((option, i) => (
                            <div key={i} className="mb-1">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={responses[index] === option}
                                        onChange={() => handleOptionChange(index, option)}
                                        className="form-radio text-futuristic-blue"
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="button" onClick={handleSave} className="w-full p-2 bg-futuristic-blue rounded-lg hover:bg-dark-blue">
                    Save Preferences
                </button>
            </form>
        </div>
    );
};

export default Preferences;
