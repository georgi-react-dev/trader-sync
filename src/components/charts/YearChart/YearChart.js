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

function YearChart({ data }) {
  // win / loss status,
  console.log({ YearChart: data });

  const getYears = (data) => {
    return data.reduce((item, value) => {
      //   console.log({ item });
      const year = value.year_month_date?.split(".")[0];
      //   if (status === "win") {
      //     if (value.profit > 0) {
      item.push(year);
      //     }
      //   } else {
      //     if (value.profit < 0) {
      //       item.push(value);
      //     }
      //   }

      return item;
    }, []);
  };
  const getYearData = (year, data) => {
    return data.reduce((item, value) => {
      //   console.log({ item });
      if (year === value.year_month_date?.split(".")[0]) {
        item.push(value);
      }
      //   const year = value.year_month_date?.split(".")[0];
      //   if (status === "win") {
      //     if (value.profit > 0) {

      //     }
      //   } else {
      //     if (value.profit < 0) {
      //       item.push(value);
      //     }
      //   }

      return item;
    }, []);
  };

  console.log({ getYearData: getYearData("2021", data) });

  console.log({ getYears: new Set(getYears(data)) });

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

  //   console.log("==============WIN===============");
  //   console.table(datesByStatusWin);

  //   console.log("==============LOSS===============");

  //   console.table(datesByStatusLoss);
  console.table(datesByStatusWin("2021"));
  const labels = Array.from(new Set(getYears(data)));
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
    <div style={{ display: "flex", justifyContent: "center", height: "30rem" }}>
      <Bar options={options} data={dataArr} />
    </div>
  );
}

export default YearChart;
