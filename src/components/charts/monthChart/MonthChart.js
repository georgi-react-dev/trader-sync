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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MonthChart({ year, data }) {
  const arr = Array.from({ length: 12 }, (_, i) => i + 1);

  //get year trades
  const yearTrades = (year, data) => {
    return data.reduce((item, value) => {
      if (year === value.year_month_date?.split(".")[0]) {
        item.push(value);
      }

      return item;
    }, []);
  };

  const getDataSeparatedByMonth = (year) => {
    const recordsByMonth = yearTrades(year, data).reduce((result, record) => {
      const yearMonth = record.year_month_date.split(".")[1];
      if (!result[parseInt(yearMonth)]) {
        result[parseInt(yearMonth)] = [];
      }

      result[parseInt(yearMonth)].push(record);

      return result;
    }, {});

    const combinedObj = {};
    const obj = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      11: 11,
      12: 12,
    };
    for (const key in obj) {
      console.log({ OBJE: key });
      if (recordsByMonth[key]) {
        combinedObj[key] = recordsByMonth[key];
      } else {
        combinedObj[key] = [];
      }
    }

    return Object.values(combinedObj);
  };

  const getDatesByStatus = (data, status) => {
    return data.map((item) => {
      return item.reduce((item, value) => {
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
    });
  };
  const datesByStatusWin = (year) =>
    getDatesByStatus(getDataSeparatedByMonth(year), "win");
  const datesByStatusLoss = (year) =>
    getDatesByStatus(getDataSeparatedByMonth(year), "loss");

  const labels = arr.map((item) => {
    return Intl.DateTimeFormat("en", { month: "short" }).format(
      new Date(item.toString())
    );
  });

  const options = {
    plugins: {
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: year,
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
        data: datesByStatusWin(year).map((item) => item.length),
        // data: datesByStatusWin(year).map((item) => item.length),

        backgroundColor: "#4fa397",
        width: "10px",
      },
      {
        label: "Loss",
        data: datesByStatusLoss(year).map((item) => item.length),
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

export default MonthChart;
