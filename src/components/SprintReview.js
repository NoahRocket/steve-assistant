import React from 'react';

const SprintReview = ({ summary, sprintGoal, reviewNotes }) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sprint Review</h2>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <p>{summary}</p>
      </section>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Sprint Goal</h3>
        <p>{sprintGoal}</p>
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">Review Notes</h3>
        <p>{reviewNotes}</p>
      </section>
    </div>
  );
};

export default SprintReview;
