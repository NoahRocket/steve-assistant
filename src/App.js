import React, { useState } from 'react';
import Header from './components/Header';
import TeamSetup from './components/TeamSetup';
import Dashboard from './components/Dashboard';

function App() {
  const [teamData, setTeamData] = useState(null);

  const handleSetupComplete = (data) => {
    setTeamData(data);
  };

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
