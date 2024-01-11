import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AChart2 = () => {
  const data = [
    { month: '1월', users: 50 },
    { month: '2월', users: 50 },
    { month: '3월', users: 50 },
    { month: '4월', users: 50 },
    { month: '5월', users: 50 },
    { month: '6월', users: 150 },
    { month: '7월', users: 150 },
    { month: '8월', users: 50 },
    { month: '9월', users: 50 },
    { month: '10월', users: 50 },
    { month: '11월', users: 50 },
    { month: '12월', users: 50 },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>월 이용자</h2>
      <AreaChart width={400} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
};

export default AChart2;
