import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

const HeatMap = ({ data }) => {
  const COLORS = {
    'Under Capacity': '#4caf50', // Green
    'At Capacity': '#ffeb3b', // Yellow
    'Over Capacity': '#f44336', // Red
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Team Capacity Overview</h3>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="assignedSP">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
          ))}
        </Bar>
      </BarChart>
      <div className="flex justify-center mt-2">
        <span className="flex items-center mr-4">
          <div className="w-4 h-4 bg-green-500 mr-1"></div> Under Capacity
        </span>
        <span className="flex items-center mr-4">
          <div className="w-4 h-4 bg-yellow-400 mr-1"></div> At Capacity
        </span>
        <span className="flex items-center">
          <div className="w-4 h-4 bg-red-500 mr-1"></div> Over Capacity
        </span>
      </div>
    </div>
  );
};

export default HeatMap;
