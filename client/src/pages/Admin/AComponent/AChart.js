import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import AMap from "./AMap";
import AChart2 from "./AChart2";
import ACalendar from "./ACalendar";
import "./A.scss";
import axios from "axios";
import { API_URL } from "../../../config/contansts";

const AChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchchartData();
  }, []);

  const fetchchartData = () => {
    axios
      .get(`${API_URL}/api/loans`)
      .then((res) => {
        const loanData = res.data;
        console.log(loanData);

        const genreData = loanData.map((loan) => {
          const bookId = loan.book_id;
          console.log(bookId);
          let genre;

          if (bookId >= 1 && bookId <= 20) {
            genre = "총류";
          } else if (bookId >= 21 && bookId <= 40) {
            genre = "사회과학";
          } else if (bookId >= 41 && bookId <= 60) {
            genre = "문학";
          } else if (bookId >= 61 && bookId <= 80) {
            genre = "예술";
          } else if (bookId >= 81 && bookId <= 100) {
            genre = "종교";
          } else if (bookId >= 101 && bookId <= 120) {
            genre = "철학";
          } else if (bookId >= 121 && bookId <= 140) {
            genre = "기술과학";
          } else if (bookId >= 141 && bookId <= 160) {
            genre = "자연과학";
          } else if (bookId >= 161 && bookId <= 180) {
            genre = "언어";
          } else if (bookId >= 181 && bookId <= 210) {
            genre = "역사";
          } else {
            genre = "기타";
          }
          return { ...loan, genre };
        });

        const groupedData = genreData.reduce((result, item) => {
          const { genre, count = 0 } = item;
          result[genre] = (result[genre] || 0) + 1;
          return result;
        }, {});

        const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8A2BE2"];

        const chartData = Object.keys(groupedData).map((genre, index) => ({
          book_id: genre,
          value: groupedData[genre],
          color: COLORS[index % COLORS.length],
        }));
        console.log(chartData);

        setChartData(chartData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8A2BE2"];

  return (
    <div className="a-chart-container-kjn">
      <div className="chart-section-kjn">
        {chartData.length === 0 ? (
          <div className="chart-none-kjn">
            이 차트에 표시할 데이터가 없습니다.
            <br />
            새로운 데이터를 등록하여 차트를 확인하세요.
          </div>
        ) : (
          <PieChart width={500} height={300}>
            <Pie
              dataKey="value"
              data={chartData}
              cx={250}
              cy={150}
              outerRadius={80}
              fill="#8884d8"
              label={(entry) => entry.book_id}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${props.payload.book_id}: ${value}`,
              ]}
            />
            <Legend
              payload={chartData.map((entry, index) => ({
                value: entry.book_id,
                type: "circle",
                id: index,
                color: entry.color,
              }))}
            />
          </PieChart>
        )}
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
