// HomePage.js
import React from 'react';
import './homepage.css';  // Import the external CSS file
import Recorder from './Recorder';  // Import the Recorder component

const HomePage = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className="heading">Speak Freely, Learn Easily!</h1>
        <h2 className="subheading">
          Empowering individuals with personalized speech therapy tools to enhance communication skills, boost confidence, and embrace fluency—all at your fingertips.
        </h2>

        {/* Add the Recorder component */}
        <Recorder />
      </div>
    </div>
  );
};

export default HomePage;
