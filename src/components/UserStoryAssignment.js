import React, { useState } from 'react';

const UserStoryAssignment = ({ teamMembers, onAddStory }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [storyPoints, setStoryPoints] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !storyPoints || !assignedTo) {
      alert('Please fill in all fields.');
      return;
    }
    onAddStory({ title, description, storyPoints: parseInt(storyPoints), assignedTo });
    setTitle('');
    setDescription('');
    setStoryPoints('');
    setAssignedTo('');
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Assign User Stories</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter user story title"
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter user story description"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Story Points (SP)</label>
          <input
            type="number"
            value={storyPoints}
            onChange={(e) => setStoryPoints(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., 8"
            min="1"
          />
        </div>
        <div>
          <label className="block mb-1">Assign To</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">-- Select Team Member --</option>
            {teamMembers.map((member, index) => (
              <option key={index} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Assign Story
        </button>
      </form>
    </div>
  );
};

export default UserStoryAssignment;
