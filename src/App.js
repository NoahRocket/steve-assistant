import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TeamSetup from './components/TeamSetup';
import Dashboard from './components/Dashboard';

function App() {
  const [teamData, setTeamData] = useState(() => {
    const savedData = localStorage.getItem('teamData');
    return savedData ? JSON.parse(savedData) : null;
  });

  const handleSetupComplete = (data) => {
    setTeamData(data);
  };

  useEffect(() => {
    if (teamData) {
      localStorage.setItem('teamData', JSON.stringify(teamData));
    }
  }, [teamData]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {!teamData ? (
        <TeamSetup onSetupComplete={handleSetupComplete} />
      ) : (
        <Dashboard teamData={teamData} />
      )}
    </div>
  );
}

export default App;
