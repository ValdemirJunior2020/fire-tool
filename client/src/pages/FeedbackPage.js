import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div>
      <h1>Employee Feedback</h1>
      <ul>
        {feedback.map((item, index) => (
          <li key={index}>{item.join(' - ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
