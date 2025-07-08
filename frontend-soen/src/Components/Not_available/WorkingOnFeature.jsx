import React from 'react';
import './WorkingOnFeature.css';

const WorkingOnFeature = () => {
  return (
    <div className="working-container">
      <div className="working-card">
        <h2>🚧 Feature Under Construction 🚧</h2>
        <p>We're working hard to bring this feature to life. Please check back soon!</p>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkingOnFeature;
