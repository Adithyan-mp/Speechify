import React, { useState } from 'react';
import './homepage.css';  // Import the external CSS file

const HomePage = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual recording functionality
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="heading">Speak Freely, Learn Easily!</h1>
        <h2 className="subheading">
          Empowering individuals with personalized speech therapy tools to enhance communication skills, boost confidence, and embrace fluency—all at your fingertips.
        </h2>

        <button
          onClick={handleRecordClick}
          className={`record-button ${isRecording ? 'recording' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="mic-icon"
          >
            <path d="M12 1v14a5 5 0 0 0 5 5h2a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5h-2a5 5 0 0 0-5 5V1"></path>
          </svg>
        </button>

        <p className="status-text">
          {isRecording ? 'Recording...' : 'Click to Start Recording'}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
