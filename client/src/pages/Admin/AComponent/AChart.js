import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import AMap from './AMap';
import AChart2 from './AChart2';
import ACalendar from './ACalendar';
import './A.scss';

const AChart = () => {
  const Chartdata = [
    { name: '문학', value: 30 },
    { name: '종교', value: 800 },
    { name: '스릴러', value: 20 },
    { name: '예술', value: 15 },
    { name: '무슨과학', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2'];

  return (
    <div className="a-chart-container-kjn">
      <div className="chart-section-kjn">
        <PieChart width={500} height={300}>
          <Pie
            data={Chartdata}
            cx={250}
            cy={150}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {Chartdata.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <AMap />
      </div>
      <div className="bottom-section-kjn">
        <AChart2 />
        <ACalendar />
      </div>
    </div>
  );
};

export default AChart;
