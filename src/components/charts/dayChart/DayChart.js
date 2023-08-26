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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DayChart({ date, data }) {
  // win / loss status,
  const getDatesByStatus = (data, status) => {
    return data.reduce((item, value) => {
      console.log({ value });

      if (status === "win") {
        if (value.profit > 0) {
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
  const datesByStatusWin = getDatesByStatus(data, "win");
  const datesByStatusLoss = getDatesByStatus(data, "loss");

  console.log("==============WIN===============");
  console.table(datesByStatusWin);

  console.log("==============LOSS===============");

  console.table(datesByStatusLoss);

  const options = {
    plugins: {
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: new Date(data[0]?.trade_date).toLocaleString("default", {
          year: "numeric",
          month: "long",
        }),
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

  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const dataArr = {
    labels,
    datasets: [
      {
        label: "Win",
        data: labels.map(
          (_, index) =>
            datesByStatusWin.filter((item) => {
              return new Date(item.trade_date).getDay() === index + 1;
            }).length
        ),
        backgroundColor: "#4fa397",
        width: "10px",
      },
      {
        label: "Loss",
        data: labels.map(
          (_, index) =>
            datesByStatusLoss.filter((item) => {
              return new Date(item.trade_date).getDay() === index + 1;
            }).length
        ),
        backgroundColor: "#e58599",
      },
    ],
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "30rem" }}>
      <Bar options={options} data={dataArr} />
    </div>
  );
}

export default DayChart;
