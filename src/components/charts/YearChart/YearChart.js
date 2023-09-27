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
import { getYears } from "./helper/index";
import { sumBy } from "lodash";
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
    const res = data.reduce((item, value) => {
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

    return {
      length: res.length,
      profit: sumBy(res, function (o) {
        return Number(o.profit);
      }),
    };
  };
  const datesByStatusWin = (year) =>
    getDatesByStatus(getYearData(year, data), "win");
  const datesByStatusLoss = (year) =>
    getDatesByStatus(getYearData(year, data), "loss");

  const labels = getYears(data);
  const test = labels
    .map((year, index) => datesByStatusWin(year))
    .map((item, index) => {
      return { ...item, label: labels[index] };
    });
  //   const test2 = test;

  const options = {
    plugins: {
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: "By Years",
      },
      tooltip: {
        callbacks: {
          afterLabel: function (context) {
            // if (label) {
            //   label += ": ";
            // }
            let label =
              "Profit " +
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.raw.profit);

            return label;
          },
        },
      },
    },
    parsing: {
      xAxisKey: "label",
      yAxisKey: "length",
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
    datasets: [
      {
        label: "Win",
        data: labels
          .map((year) => datesByStatusWin(year))
          .map((item, index) => {
            return { ...item, label: labels[index] };
          }),
        backgroundColor: "#4fa397",
        width: "10px",
      },
      {
        label: "Loss",
        data: labels
          .map((year) => datesByStatusLoss(year))
          .map((item, index) => {
            return { ...item, label: labels[index] };
          }),
        backgroundColor: "#e58599",
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxHeight: "28rem",
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
