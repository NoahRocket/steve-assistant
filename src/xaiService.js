import axios from 'axios';

const API_BASE_URL = 'https://api.xai.com'; // Replace with actual base URL

const xaiService = {
  generateSummary: async (userStories, teamData) => {
    const response = await axios.post(`${API_BASE_URL}/generate-summary`, {
      userStories,
      teamData,
    });
    return response.data;
  },
  suggestSprintGoal: async (userStories, teamData) => {
    const response = await axios.post(`${API_BASE_URL}/suggest-sprint-goal`, {
      userStories,
      teamData,
    });
    return response.data;
  },
  generateReviewNotes: async (userStories, teamData) => {
    const response = await axios.post(`${API_BASE_URL}/generate-review-notes`, {
      userStories,
      teamData,
    });
    return response.data;
  },
};

export default xaiService;
