import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { getMonthDeals } from "../../calendar/helper";
import { getYears } from "./helper/index";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function YearChart({ data }) {
  const getYearData = (year, data) => {
    return data.reduce((item, value) => {
      if (year === value.year_month_date?.split(".")[0]) {
        item.push(value);
      }

      return item;
    }, []);
  };

  const getDatesByStatus = (data, status) => {
    console.log({ DATATATA: data });
    return data.reduce((item, value) => {
      if (status === "win") {
        if (value.profit >= 0) {
          item.push(value);
        }
      } else {
        if (value.profit < 0) {
          item.push(value);
        }
      }

      return item;
    }, []);
  };
  const datesByStatusWin = (year) =>
    getDatesByStatus(getYearData(year, data), "win");
  const datesByStatusLoss = (year) =>
    getDatesByStatus(getYearData(year, data), "loss");

  const labels = getYears(data);
  const test = labels.map((year, index) => datesByStatusWin(year).length);

  console.log({ test });
  const options = {
    plugins: {
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: "By Years",
      },
    },
    subtitle: {
      display: true,
      text: "Custom Chart Subtitle",
    },
    responsive: true,
    barPercentage: 0.7,
    scales: {
      x: {
        stacked: true,
        tickWidth: 3, // number (pixels) or 'flex'
        maxBarThickness: 8, // number (pixels)
      },
      y: {
        stacked: true,
        tickWidth: 3, // number (pixels) or 'flex'
        maxBarThickness: 8, // number (pixels)
      },
    },
  };

  const dataArr = {
    labels,
    datasets: [
      {
        label: "Win",
        data: labels.map((year, index) => datesByStatusWin(year).length),
        backgroundColor: "#4fa397",
        width: "10px",
      },
      {
        label: "Loss",
        data: labels.map((year, index) => datesByStatusLoss(year).length),
        backgroundColor: "#e58599",
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "30rem",
        border: " 1px solid #696969",
        paddingLeft: "5px",
        paddingTop: "5px",
      }}
    >
      <Bar options={options} data={dataArr} />
    </div>
  );
}

export default YearChart;