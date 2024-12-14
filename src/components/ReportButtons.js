import React from 'react';
import xaiService from '../services/xaiService';

const ReportButtons = ({ userStories, teamData }) => {
  const handleGenerateSummary = async () => {
    try {
      const data = await xaiService.generateSummary(userStories, teamData);
      const summary = data.summary;
      alert(`Summary Generated:\n\n${summary}`);
    } catch (error) {
      console.error(error);
      alert('Failed to generate summary.');
    }
  };

  const handleSuggestSprintGoal = async () => {
    try {
      const data = await xaiService.suggestSprintGoal(userStories, teamData);
      const sprintGoal = data.sprintGoal;
      alert(`Suggested Sprint Goal:\n\n${sprintGoal}`);
    } catch (error) {
      console.error(error);
      alert('Failed to suggest sprint goal.');
    }
  };

  const handleGenerateReviewNotes = async () => {
    try {
      const data = await xaiService.generateReviewNotes(userStories, teamData);
      const reviewNotes = data.reviewNotes;
      alert(`Sprint Review Notes:\n\n${reviewNotes}`);
    } catch (error) {
      console.error(error);
      alert('Failed to generate review notes.');
    }
  };

  return (
    <div className="flex space-x-4 mt-6">
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
