import React from "react";
import { Bar } from "react-chartjs-2";
import {chart as ChartJs} from 'chart.js/auto'
const BarChart = () => {
  let data = {
    labels: ["Jan", "Feb", "Mar", "April", "May"],
    datasets: [
      {
        label: "Sales 2020 (M)",
        data: [1,2,3,4,5],
        borderColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
      },
      {
        label: "Sales 2019 (M)",
        data: [4, 3, 2, 2, 3],
        borderColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
      },
      {
        label: "Sales 2018 (M)",
        data: [3,1,1,5,8],
        borderColor: [
          "rgba(26, 172, 50, 0.2)",
          "rgba(26, 172, 50, 0.2)",
          "rgba(26, 172, 50, 0.2)",
          "rgba(26, 172, 50, 0.2)",
          "rgba(26, 172, 50, 0.2)",
        ],
        backgroundColor: [
          "rgba(26, 172, 50, 0.2)",
          "rgba(26, 172, 50, 0.2)",
          "rgba(26, 172, 50, 0.2)",
          "rgba(26, 172, 50, 0.2)",
          "rgba(26, 172, 50, 0.2)",
        ],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Bar Chart",
    },
   
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
