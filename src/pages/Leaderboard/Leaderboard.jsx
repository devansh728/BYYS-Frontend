import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Leaderboard.css";
import LeaderboardSection from "../../components/LeaderboardSection/LeaderboardSection";

const Leaderboard = () => {
  useEffect(() => {
    document.title = "Leaderboard - BYVS";
  }, []);

  return (
    <div className="leaderboard-page">
      <Header />
      <main className="main-content">
        <div className="container">
          <LeaderboardSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
