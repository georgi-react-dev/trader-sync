import React from "react";
import { useNavigate } from "react-router-dom";
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
import { sumBy } from "lodash";

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
  const navigate = useNavigate();
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
      if (recordsByMonth[key]) {
        combinedObj[key] = recordsByMonth[key];
      } else {
        combinedObj[key] = [];
      }
    }

    return Object.values(combinedObj);
  };

  const getDatesByStatus = (data, status) => {
    const res = data.map((item) => {
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
    // ;
    return res.map((item) => {
      return {
        length: item.length,
        profit: sumBy(item, function (o) {
          return Number(o.profit);
        }),
      };
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

  const test = datesByStatusLoss(year).map((item, index) => {
    return { ...item, label: labels[index] };
  });
  const options = {
    plugins: {
      title: {
        font: {
          size: 20,
          weight: "normal",
        },
        color: "#fff",
        display: true,
        text: year,
      },
      tooltip: {
        callbacks: {
          //   label: function (context) {
          //     console.log({ context });
          //     let label = context.dataset.label || "";

          //     if (label) {
          //       label += ": ";
          //     }
          //     if (context.parsed.y !== null) {
          //       label += new Intl.NumberFormat("en-US", {
          //         style: "currency",
          //         currency: "USD",
          //       }).format(context.parsed.y);
          //     }
          //     return label;
          //   },
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
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        const element = elements[0];
        const datasetIndex = element.datasetIndex;
        const index = element.index;

        const label = chart.data.labels[index];
        const value = chart.data.datasets[datasetIndex].data[index];

        console.log(`You clicked on ${label}: ${JSON.stringify(value)}`);
        const selectedDate = new Date(`${label} ${year}`); // or your specific date
        navigate("/calendar", { state: { date: selectedDate } });
      }
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
    // labels,
    datasets: [
      {
        label: "Win",
        // data: datesByStatusWin(year).map((item) => {
        //   //   console.log({ item });
        //   return item.length;
        // }),
        data: datesByStatusWin(year).map((item, index) => {
          return { ...item, label: labels[index] };
        }),

        backgroundColor: "#4fa397",
        width: "10px",
      },
      {
        label: "Loss",
        data: datesByStatusLoss(year).map((item, index) => {
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

export default MonthChart;
