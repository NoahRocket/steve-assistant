import React from 'react';
import xaiService from '../services/xaiService';
import { useNavigate } from 'react-router-dom';

const ReportButtons = ({ userStories, teamData, setReports }) => {
  const navigate = useNavigate();

  const handleGenerateSummary = async () => {
    try {
      const data = await xaiService.generateSummary(userStories, teamData);
      const summary = data.summary;
      setReports((prev) => ({ ...prev, summary }));
    } catch (error) {
      console.error(error);
      alert('Failed to generate summary.');
    }
  };

  const handleSuggestSprintGoal = async () => {
    try {
      const data = await xaiService.suggestSprintGoal(userStories, teamData);
      const sprintGoal = data.sprintGoal;
      setReports((prev) => ({ ...prev, sprintGoal }));
    } catch (error) {
      console.error(error);
      alert('Failed to suggest sprint goal.');
    }
  };

  const handleGenerateReviewNotes = async () => {
    try {
      const data = await xaiService.generateReviewNotes(userStories, teamData);
      const reviewNotes = data.reviewNotes;
      setReports((prev) => ({ ...prev, reviewNotes }));
      navigate('/sprint-review');
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
