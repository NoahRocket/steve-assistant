import React, { useState } from 'react';
import TeamMemberForm from './TeamMemberForm';

const TeamSetup = ({ onSetupComplete }) => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    { name: '', capacitySP: '', availabilityDays: '', unavailableDays: [] },
  ]);

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: '', capacitySP: '', availabilityDays: '', unavailableDays: [] }]);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  const handleMemberChange = (index, updatedMember) => {
    const updatedMembers = teamMembers.map((member, i) => (i === index ? updatedMember : member));
    setTeamMembers(updatedMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs here if necessary
    onSetupComplete({ teamName, teamMembers });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Set Up Your Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter team name"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">Team Members</h3>
        {teamMembers.map((member, index) => (
          <TeamMemberForm
            key={index}
            index={index}
            member={member}
            onChange={(updatedMember) => handleMemberChange(index, updatedMember)}
            onRemove={() => handleRemoveMember(index)}
            canRemove={teamMembers.length > 1}
          />
        ))}
        <button
          type="button"
          onClick={handleAddMember}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          + Add Member
        </button>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamSetup;
