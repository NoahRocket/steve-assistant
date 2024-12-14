import React from 'react';
import axios from 'axios';

const ReportButtons = ({ userStories, teamData }) => {
  const handleGenerateSummary = async () => {
    try {
      const response = await axios.post('https://api.xai.com/generate-summary', {
        userStories,
        teamData,
      });
      const summary = response.data.summary;
      alert(`Summary Generated:\n\n${summary}`);
    } catch (error) {
      console.error(error);
      alert('Failed to generate summary.');
    }
  };

  const handleSuggestSprintGoal = async () => {
    try {
      const response = await axios.post('https://api.xai.com/suggest-sprint-goal', {
        userStories,
        teamData,
      });
      const sprintGoal = response.data.sprintGoal;
      alert(`Suggested Sprint Goal:\n\n${sprintGoal}`);
    } catch (error) {
      console.error(error);
      alert('Failed to suggest sprint goal.');
    }
  };

  const handleGenerateReviewNotes = async () => {
    try {
      const response = await axios.post('https://api.xai.com/generate-review-notes', {
        userStories,
        teamData,
      });
      const reviewNotes = response.data.reviewNotes;
      alert(`Sprint Review Notes:\n\n${reviewNotes}`);
    } catch (error) {
      console.error(error);
      alert('Failed to generate review notes.');
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleGenerateSummary}
        className="px-4 py-2 bg-indigo-500 text-white rounded"
      >
        Generate Summary
      </button>
      <button
        onClick={handleSuggestSprintGoal}
        className="px-4 py-2 bg-yellow-500 text-white rounded"
      >
        Suggest Sprint Goal
      </button>
      <button
        onClick={handleGenerateReviewNotes}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Generate Review Notes
      </button>
    </div>
  );
};

export default ReportButtons;
