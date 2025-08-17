import React, { useState } from 'react';
import './LeaderboardSection.css';
import LeaderboardTabs from './LeaderboardTabs';

const LeaderboardSection = () => {
  return (
    <div className="leaderboard">
      {/* Page Header */}
      <section className="leaderboard-header">
        <h1>Leaderboard</h1>
        <p>Track your progress and compete with fellow BYVS members</p>
      </section>

      {/* Leaderboard Content */}
      <div className="leaderboard-content">
        {/* Leaderboard Section */}
        <section className="leaderboard-section">
          <h2>Share Champions</h2>
          <LeaderboardTabs />
        </section>
      </div>
    </div>
  );
};

export default LeaderboardSection;
