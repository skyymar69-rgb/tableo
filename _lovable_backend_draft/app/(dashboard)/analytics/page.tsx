import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const AnalyticsDashboard = () => {
  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <h2>Key Performance Indicators (KPIs)</h2>
      <div>
        <h3>Total Users: 1200</h3>
        <h3>Total Revenue: $45,000</h3>
      </div>
      <h2>Analytics Charts</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <h2>AI Recommendations</h2>
      <p>Consider increasing marketing spend in Q2 to drive user growth.</p>
      <p>Leverage social media platforms more effectively for user engagement.</p>
    </div>
  );
};

export default AnalyticsDashboard;