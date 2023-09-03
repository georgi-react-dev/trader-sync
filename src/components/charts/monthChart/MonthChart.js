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
import { getYearMonths } from "./helper/index";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MonthChart({ year, data }) {
  const allMonths = getYearMonths(year, data);
  console.log({ allMonths });
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
    // console.log({ getDataSeparatedByMonthDATA: data });
    console.log({ YEARTRADES: yearTrades(year, data) });
    const recordsByMonth = yearTrades(year, data).reduce((result, record) => {
      const yearMonth = record.year_month_date;
      if (!result[yearMonth]) {
        result[yearMonth] = [];
      }

      result[yearMonth].push(record);

      return result;
    }, {});

    // allMonths.forEach((element) => {
    //   monthsData = data.reduce((item, value) => {
    //     const month = value.year_month_date?.split(".")[1];
    //     if (year === value.year_month_date?.split(".")[0]) {
    //       if (element === month) {
    //         item.push(value);
    //       }
    //     }

    //     return item;
    //   }, []);
    // });

    console.log({ recordsByMonth });
    return recordsByMonth;
    // return Object.values(recordsByMonth).filter((item) => item.length > 0);
    // return new Set(Array.from(monthsData));
  };

  console.log({
    getDataSeparatedByMonth: getDataSeparatedByMonth(year),
  });
  //   console.log({ TRTTRT: getMonthData(year, data) });
  const getDatesByStatus = (data, status) => {
    console.log({ DATATATA: Object.values(data) });
    const da = Object.values(data).map((item) => {
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
    // const datata = Object.values(data).reduce((item, value) => {
    //   if (status === "win") {
    //     if (value.profit >= 0) {
    //       item.push(value);
    //     }
    //   } else {
    //     if (value.profit < 0) {
    //       item.push(value);
    //     }
    //   }

    //   return item;
    // }, []);

    console.log({ tazi: da });
    return da;
  };
  const datesByStatusWin = (year) =>
    getDatesByStatus(getDataSeparatedByMonth(year), "win");
  const datesByStatusLoss = (year) =>
    getDatesByStatus(getDataSeparatedByMonth(year), "loss");

  const labels = getYearMonths(year, data).map((item) => {
    return Intl.DateTimeFormat("en", { month: "short" }).format(new Date(item));
  });
  const test = datesByStatusWin(year);

  console.log({ test: test });
  const options = {
    plugins: {
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: "By Months",
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
