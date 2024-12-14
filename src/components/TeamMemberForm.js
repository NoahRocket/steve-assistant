import React, { useState } from 'react';

const TeamMemberForm = ({ index, member, onChange, onRemove, canRemove }) => {
  const [unavailableDaysInput, setUnavailableDaysInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...member, [name]: value });
  };

  const handleUnavailableDays = () => {
    const days = unavailableDaysInput.split(',').map((day) => parseInt(day.trim())).filter(Boolean);
    onChange({ ...member, unavailableDays: days });
    setUnavailableDaysInput('');
  };

  return (
    <div className="border p-4 mb-4 rounded">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Member {index + 1}</h4>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        )}
      </div>
      <div className="mb-2">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={member.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter member name"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Capacity (Story Points)</label>
        <input
          type="number"
          name="capacitySP"
          value={member.capacitySP}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., 50"
          min="0"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Availability (Days)</label>
        <input
          type="number"
          name="availabilityDays"
          value={member.availabilityDays}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., 10"
          min="1"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Unavailable Days (comma-separated)</label>
        <input
          type="text"
          value={unavailableDaysInput}
          onChange={(e) => setUnavailableDaysInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., 3,7"
        />
        <button
          type="button"
          onClick={handleUnavailableDays}
          className="mt-1 px-3 py-1 bg-gray-300 rounded"
        >
          Set Unavailable Days
        </button>
      </div>
      {member.unavailableDays.length > 0 && (
        <div className="mt-2">
          <strong>Unavailable Days:</strong> {member.unavailableDays.join(', ')}
        </div>
      )}
    </div>
  );
};

export default TeamMemberForm;
