import React, { useEffect, useCallback, useState } from "react";
import { styled } from "styled-components";
import Modal from "../modal/Modal";
import { sumBy } from "lodash";
import format from "date-fns/format";
import DealsTable from "../deals/DealsTable";
import axios from "axios";
import DatePicker from "react-datepicker";
import SwitchButton from "../buttons/SwitchButton";
import { UploadForm } from "../form/UploadForm";
import "react-datepicker/dist/react-datepicker.css";
import {
  getDayDealsLength,
  getDayDealsInfo,
  getWeekDays,
  getDayDealsProfit,
  getMonthlyWeeklyProfits,
} from "./helper";
const DayContainer = styled.div`
  color: #fff;
  overflow: hidden;
  // position: relative;
  background: #252b3d;

  display: flex;
  text-align: left;
  flex-direction: column;

  &.profit {
    background: #125c51;
    border-left: 2px solid #939393;
  }
  &.loss {
    background: #4f293f;
    border-left: 2px solid #939393;
  }

  .inner-container {
    padding: 10px 0 0 10px;
    display: flex;
    text-align: left;
    flex-direction: column;
    position: relative;

    span {
      position: absolute;
      top: -4px;
      border: 1px solid #7e7e7e;
      left: -1px;
      font-size: 1.2rem;
      padding-right: 2px;
      padding-left: 2px;
    }
  }
`;

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
  console.log({ selectedDateSr: selectedDate });
  const [showModal, setShowModal] = useState(false);
  const [dealsInfo, setDealsInfo] = useState(null);
  const [isBussinessDays, setIsBussinessDays] = useState(false);
  const getDayContainerBackground = (profit) => {
    if (!profit) return "";
    return profit >= 0 ? " profit" : " loss";
  };
  const [switchOn, setSwitchOn] = useState(false);

  const handleSwitchToggle = (e) => {
    console.log({ e });
    setSwitchOn((prev) => !prev);
    setIsBussinessDays(e.target.checked);
  };
  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Function to render the calendar grid
  const renderCalendar = () => {
    const currentDate = new Date();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // Get the number of days in the selected month
    // Get the number of days in the selected month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the index of the first day of the month
    const firstDayIndex = new Date(year, month, 1).getDay();
    console.log({ month });
    console.log({ year });
    console.log({ firstDayIndex });
    // Create an array of empty grid cells before the first day
    const emptyCells = Array(firstDayIndex).fill(null);
    const calendarCells = [
      ...emptyCells,
      ...Array(daysInMonth)
        .fill()
        .map((_, index) => index + 1),
    ];

    const businessDays = getBusinessDays(year, month);
    console.log({ businessDays });
    let dataArr = isBussinessDays ? businessDays : calendarCells;
    const cells = dataArr.map((day, index) => {
      const profit = getDayDealsProfit(
        format(new Date(year, month, day), "yyyy.MM.dd"),
        data
      );

      const dealsLength = getDayDealsLength(
        format(new Date(year, month, day), "yyyy.MM.dd"),
        data
      );
      return (
        <DayContainer
          className={"day-container" + getDayContainerBackground(profit)}
          style={{
            width: "100px",
            height: "100px",
          }}
          key={day > 0 ? day : day + "_" + index}
          onClick={() => {
            setDealsInfo(
              getDayDealsInfo(
                format(new Date(year, month, day), "yyyy.MM.dd"),
                data
              )
            );
            // showDayDealsInfo(
            //   format(new Date(year, month, day), "yyyy.MM.dd"),
            //   data
            // )
            setShowModal(true);
          }}
          data-date={format(new Date(year, month, day), "yyyy.MM.dd")}
          data-profit={profit}
          data-deals-length={dealsLength}
        >
          <div className="inner-container">
            <span>{day}</span>

            <div style={{ marginTop: "1rem" }}>
              <div
              // onClick={() => {
              //   setDealsInfo(
              //     getDayDealsInfo(
              //       format(new Date(year, month, day), "yyyy.MM.dd"),
              //       data
              //     )
              //   );
              //   // showDayDealsInfo(
              //   //   format(new Date(year, month, day), "yyyy.MM.dd"),
              //   //   data
              //   // )
              //   setShowModal(true);
              // }}
              >
                {dealsLength}
              </div>
              <br />
              {profit ? profit + " $" : null}
            </div>
          </div>
        </DayContainer>
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
        `${process.env.REACT_APP_API_ENDPOINT}/getTrades`,
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
    // console.log({ length: dayContainerArr.length });

    const weekProfit = [];
    const dealsLength = [];
    Array.from(dayContainerArr).forEach((element, index) => {
      console.log({ elementProfitd: element.dataset.dealsLength });

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

    console.log({ positivePips });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, data]);

  const nthSum = (arr) => {
    console.log({ HERE: arr });
    let sum = 0;
    const arrr = [];
    for (let i = 0; i < arr.length; i++) {
      console.log({ item: arr[i] });
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

  // function separateIntoWeeklySums(array) {
  //   const weeklySums = [];
  //   let sum = 0;

  //   for (let i = 0; i < array.length; i++) {
  //     sum += array[i];

  //     if ((i + 1) % 7 === 0) {
  //       // check if it's the end of the week
  //       weeklySums.push(sum);
  //       sum = 0; // reset sum for the next week
  //     }
  //   }

  //   if (sum !== 0) {
  //     weeklySums.push(sum); // push the remaining sum if the last week is incomplete
  //   }

  //   return weeklySums;
  // }
  return (
    <div style={{ width: "800px", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Forex Calendar</h1> <UploadForm />
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <DealsTable dealsInfo={dealsInfo} />
        </Modal>
      )}
      <div>
        <DatePicker
          selected={selectedDate}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          onChange={(date) => setSelectedDate(date)}
        />
        {/* <button
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
            )
          }
        >
          Prev
        </button>
        <span>
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
            )
          }
        >
          Next
        </button> */}
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        <h2>
          {selectedDate.toLocaleString("default", {
            year: "numeric",
            month: "long",
          })}
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            style={{
              color: Number(monthTotal) > 0 ? "#468481" : "#955b80",
              marginBottom: "0",
            }}
          >
            ${monthTotal?.toFixed(2)}
          </h2>
          <span>Return $ for the Month</span>
        </div>

        <div
          style={{
            width: "300px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Week Days</span>
          <SwitchButton on={switchOn} onClick={handleSwitchToggle} />
          <span>Bussiness Days</span>
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
          {/* {console.log({
            getMonthlyWeeklyProfits: getMonthlyWeeklyProfits(data),
          })} */}

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
          {/* <DealsTable dealsInfo={dealsInfo} /> */}
        </div>
      )}
    </div>
  );
};

export default Calendar;
