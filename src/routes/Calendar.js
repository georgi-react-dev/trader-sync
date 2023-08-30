import React, { useEffect, useState } from "react";
import Modal from "../components/modal/Modal";
import { sumBy } from "lodash";
import DealsTable from "../components/deals/DealsTable";
import DatePicker from "react-datepicker";
import SwitchButton from "../components/buttons/SwitchButton";
import { DashboardHeader } from "./Dashboard";
import "react-datepicker/dist/react-datepicker.css";
import {
  nthSum,
  getPipsForMonth,
  getTradesForMonth,
} from "../components/calendar/helper";
import DayChart from "../components/charts/dayChart/DayChart";
import CalendarComponent from "../components/calendar/Calendar/CalendarComponent";
import useData from "../hooks/useData";
import AnimatedNumber from "../components/animatedNumber/AnimatedNumber";

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
                color: Number(monthTotal) >= 0 ? "#468481" : "#955b80",
              }}
            >
              <AnimatedNumber prefix={"$"} n={Number(monthTotal)} />
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
            {selectedDate && (
              <CalendarComponent
                selectedDate={selectedDate}
                isBussinessDays={isBussinessDays}
                setDealsInfo={setDealsInfo}
                setShowModal={setShowModal}
                setData={setData}
              />
            )}
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
