import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { API_URL } from '../../../config/contansts';

const AChart2 = () => {
  const [chartData2, setChartData2] = useState([]);

  useEffect(() => {
    fetchChartData2();
  }, []);

  const fetchChartData2 = () => {
    axios
      .get(`${API_URL}/api/loans`)
      .then((res) => {
        const loanData = res.data;

        const monthlyLoans = loanData.reduce((acc, loan) => {
          const loanMonth = new Date(loan.loan_date).getMonth() + 1;
          acc[loanMonth] = (acc[loanMonth] || 0) + 1;
          return acc;
        }, {});

        const chartData = Array.from({ length: 12 }, (_, index) => {
          const month = index + 1;
          return {
            month: `${month}월`,
            loans: monthlyLoans[month] || 0,
          };
        });

        setChartData2(chartData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>월 이용자</h2>
      <AreaChart width={650} height={300} data={chartData2}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="loans" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
};

export default AChart2;
