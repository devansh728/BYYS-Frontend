import React, { useState, useEffect } from "react";
import "./LeaderboardSection.css";
import { getLeaderboardData } from "../../api/referralService";

const LeaderboardTabs = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getLeaderboardData(activeTab, currentPage);
        setLeaderboardData(response.content);
        setTotalPages(response.totalPages);
        setCurrentPage(response.number);
      } catch (err) {
        setError(err.message || "Failed to load leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderLeaderboard = () => (
  <div className="leaderboard-table">
    <div className="table-header">
      <span>Rank</span>
      <span>Member</span>
      <span>Referrals</span>
      <span>Change</span>
    </div>
    {loading ? (
      <div className="loading">Loading...</div>
    ) : error ? (
      <div className="error-message">{error}</div>
    ) : (
      leaderboardData.map((user, index) => (
        <div key={index} className="table-row">
          <span className={`rank ${index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""}`}>
            {index + 1}
          </span>
          <span className="member-name">
            <img
              src={`https://i.pravatar.cc/40?img=${index + 5}`}
              alt={user.name}
              className="avatar"
            />
            {user.name}
          </span>
          <span className="referrals">{user.verifiedReferrals}</span>
          <span className="conversion-rate">
            {user.conversionRate?.toFixed(1) || 0}%
          </span>
        </div>
      ))
    )}
  </div>
);

  return (
    <div className="leaderboard-tabs">
      <div className="tabs">
        <button className={activeTab === "daily" ? "active" : ""} onClick={() => { setActiveTab("daily"); setCurrentPage(0); }}>
          Daily
        </button>
        <button className={activeTab === "weekly" ? "active" : ""} onClick={() => { setActiveTab("weekly"); setCurrentPage(0); }}>
          Weekly
        </button>
        <button className={activeTab === "monthly" ? "active" : ""} onClick={() => { setActiveTab("monthly"); setCurrentPage(0); }}>
          Monthly
        </button>
      </div>

      <div className="tab-content">{renderLeaderboard(leaderboardData[activeTab])}</div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaderboardTabs;
