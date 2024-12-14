import React, { useState } from 'react';
import Header from './components/Header';
import TeamSetup from './components/TeamSetup';
import Dashboard from './components/Dashboard';
import SprintReview from './components/SprintReview';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [teamData, setTeamData] = useState(null);
  const [reports, setReports] = useState({
    summary: '',
    sprintGoal: '',
    reviewNotes: '',
  });

  const handleSetupComplete = (data) => {
    setTeamData(data);
  };

  const handleReports = (newReports) => {
    setReports(newReports);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              !teamData ? (
                <TeamSetup onSetupComplete={handleSetupComplete} />
              ) : (
                <Dashboard teamData={teamData} />
              )
            }
          />
          <Route
            path="/sprint-review"
            element={
              <SprintReview
                summary={reports.summary}
                sprintGoal={reports.sprintGoal}
                reviewNotes={reports.reviewNotes}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
