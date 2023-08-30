import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Modal from "../components/modal/Modal";
import { sumBy } from "lodash";
import DealsTable from "../components/deals/DealsTable";
import axios from "axios";
import DatePicker from "react-datepicker";
import SwitchButton from "../components/buttons/SwitchButton";
import { DashboardHeader } from "./Dashboard";

import "react-datepicker/dist/react-datepicker.css";
import {
  getWeekDays,
  getPipsForMonth,
  getTradesForMonth,
} from "../components/calendar/helper";
import DayChart from "../components/charts/dayChart/DayChart";
import DayContainer from "../components/calendar/dayContainer/DayContainer";

const Calendar = () => {
  // const test = sumBy(data, function (o) {
  //   return Number(o.swap);
  // });
  // console.log({ test });
  // Initialize the calendar state with the current date
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [weeksProfits, setWeeksProfits] = useState([]);
  const [monthTotal, setMonthTotal] = useState(null);
  const [weeksDealsCount, setWeeksDealsCount] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showGraphModal, setShowGraphModal] = useState(false);

  const [dealsInfo, setDealsInfo] = useState(null);
  const [isBussinessDays, setIsBussinessDays] = useState(false);

  const [switchOn, setSwitchOn] = useState(false);

  const handleSwitchToggle = (e) => {
    // setSwitchOn((prev) => !prev);
    setIsBussinessDays(e.target.checked);
  };

  // Function to render the calendar grid
  const renderCalendar = () => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // Get the number of days in the selected month
    // Get the number of days in the selected month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the index of the first day of the month
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Create an array of empty grid cells before the first day
    const emptyCells = Array(firstDayIndex).fill(null);
    const calendarCells = [
      ...emptyCells,
      ...Array(daysInMonth)
        .fill()
        .map((_, index) => index + 1),
    ];

    const businessDays = getBusinessDays(year, month);
    let dataArr = isBussinessDays ? businessDays : calendarCells;
    const cells = dataArr.map((day, index) => {
      return (
        data.length && (
          <DayContainer
            key={index}
            data={data}
            year={year}
            month={month}
            day={day}
            index={index}
            setDealsInfo={setDealsInfo}
            setShowModal={setShowModal}
          />
        )
      );
    });

    return (
      <>
        {getWeekDays(isBussinessDays)}
        {cells}
      </>
    );
  };
  const getBusinessDays = (year, month) => {
    const businessDays = [];
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        businessDays.push(new Date(date).getDate());
      }
      date.setDate(date.getDate() + 1);
    }

    return businessDays;
  };
  useEffect(() => {
    const fetchData = async () => {
      // Replace 'your_api_endpoint' with the actual API endpoint
      const response = await axios.get(
        "https://doubtful-fawn-baseball-cap.cyclic.app/getTrades",
        {
          params: {
            year_month_date: `${selectedDate.getFullYear()}.${
              selectedDate.getMonth() + 1 < 10
                ? `0${selectedDate.getMonth() + 1}`
                : selectedDate.getMonth() + 1
            }`,
          },
        }
      );
      console.log({ REZULTS: response.data.trades });
      //setSelectedDate(new Date(response.data.trades[0].trade_date));
      setData(response.data.trades);
    };
    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    const dayContainerArr = document.getElementsByClassName("day-container");

    const weekProfit = [];
    const dealsLength = [];
    Array.from(dayContainerArr).forEach((element, index) => {
      if (element.dataset.profit !== undefined) {
        weekProfit.push(Number(element.dataset.profit));
      } else {
        weekProfit.push(0);
      }

      if (element.dataset.dealsLength !== undefined) {
        dealsLength.push(
          Number(element.dataset.dealsLength.replace(" Trades", ""))
        );
      } else {
        dealsLength.push(0);
      }
    });

    setWeeksProfits(nthSum(weekProfit));
    setWeeksDealsCount(nthSum(dealsLength));

    setMonthTotal(
      sumBy(data, function (o) {
        return Number(o.profit);
      }) +
        sumBy(data, function (o) {
          return Number(o.swap);
        })
    );

    const positivePips = sumBy(data, function (item) {
      if ((item.profit / item.volume) * 0.1 > 0) {
        return (item.profit / item.volume) * 0.1;
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, data]);

  const nthSum = (arr) => {
    let sum = 0;
    const arrr = [];
    for (let i = 0; i < arr.length; i++) {
      sum += +arr[i];
      if ((i + 1) % 7 === 0) {
        arrr.push(sum.toFixed(2));
        sum = 0;
      }
    }
    if (sum !== 0) {
      arrr.push(sum.toFixed(2));
    }
    return arrr;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <DashboardHeader>
        <h1 style={{ position: "absolute" }}>Calendar</h1>
        <div style={{ margin: "0 auto" }}>
          <DatePicker
            style={{ marginLeft: "100px" }}
            selected={selectedDate}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            onChange={(date) => setSelectedDate(date)}
          />
        </div>
      </DashboardHeader>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <DealsTable dealsInfo={dealsInfo} />
        </Modal>
      )}
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2
              style={{
                color: Number(monthTotal) > 0 ? "#468481" : "#955b80",
              }}
            >
              ${monthTotal?.toFixed(2)}
            </h2>
            <span>Return $ for the Month</span>
            <span>{getPipsForMonth(data)}</span>
            <span>{getTradesForMonth(data)}</span>
          </div>

          <div
            style={{
              width: "435px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Week Days</span>
            <SwitchButton on={switchOn} onClick={handleSwitchToggle} />
            <span>Bussiness Days</span>

            <button onClick={() => setShowGraphModal(true)}>Show Graph</button>
          </div>
        </div>
      </div>

      {selectedDate && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            background: "#111721",
          }}
        >
          <div
            style={{
              marginTop: "2rem",
              display: "grid",
              flexWrap: "wrap",

              gridTemplateColumns: `repeat(${
                isBussinessDays ? "5" : "7"
              }, 100px)`,
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {renderCalendar()}
          </div>

          <div
            style={{
              marginTop: "2rem",
              marginLeft: "10px",
            }}
          >
            <div
              style={{
                padding: "5px",
                height: "max-content",
              }}
            >
              Weekly Totals
            </div>
            <div
              style={{
                display: "grid",
                flexDirection: "column",
                gridTemplateRows: "repeat(7, 100px)",
                gap: "10px",
              }}
            >
              {weeksProfits?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      color: Number(item) > 0 ? "#468481" : "#4f293f",
                      background: "#222838",
                      textAlign: "left",
                      padding: "0 10px",
                    }}
                  >
                    <span
                      style={{
                        color: Number(item) > 0 ? "#468481" : "#955b80",
                      }}
                    >
                      {item !== "0.00" ? item + "$" : null}{" "}
                    </span>
                    <div style={{ color: "#fff" }}>
                      {weeksDealsCount[index] > 0
                        ? weeksDealsCount[index] * 1 + " Trades"
                        : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {showGraphModal && (
        <Modal setShowModal={setShowGraphModal}>
          <DayChart date={selectedDate} data={data} />
        </Modal>
      )}

      {/* <Chart /> */}
    </div>
  );
};

export default Calendar;
