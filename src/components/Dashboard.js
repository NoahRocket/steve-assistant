import React, { useState } from 'react';
import HeatMap from './HeatMap';
import ReportButtons from './ReportButtons';
import UserStoryAssignment from './UserStoryAssignment';

const Dashboard = ({ teamData }) => {
  const [userStories, setUserStories] = useState([]);

  const handleAddUserStory = (story) => {
    setUserStories([...userStories, story]);
  };

  const calculateCapacityStatus = () => {
    return teamData.teamMembers.map((member) => {
      const assignedSP = userStories
        .filter((story) => story.assignedTo === member.name)
        .reduce((total, story) => total + parseInt(story.storyPoints), 0);
      const status =
        assignedSP < member.capacitySP
          ? 'Under Capacity'
          : assignedSP === member.capacitySP
          ? 'At Capacity'
          : 'Over Capacity';
      return { ...member, assignedSP, status };
    });
  };

  const capacityData = calculateCapacityStatus();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard - {teamData.teamName}</h2>
      <HeatMap data={capacityData} />
      <UserStoryAssignment
        teamMembers={teamData.teamMembers}
        onAddStory={handleAddUserStory}
      />
      <ReportButtons userStories={userStories} teamData={teamData} />
    </div>
  );
};

export default Dashboard;
