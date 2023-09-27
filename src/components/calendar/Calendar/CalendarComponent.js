import React, { useEffect } from "react";
import DayContainer from "../dayContainer/DayContainer";
import { getWeekDays } from "../helper";
import useData from "../../../hooks/useData";

function CalendarComponent({
  selectedDate,
  isBussinessDays,
  setDealsInfo,
  setShowModal,
  setData,
}) {
  const { data } = useData(selectedDate);

  useEffect(() => {
    data.length && setData(data);
  }, [data, setData]);

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
      return data.length ? (
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
      ) : null;
    });

    return (
      <>
        {getWeekDays(isBussinessDays)}
        {cells.length ? cells : null}
      </>
    );
  };

  return <>{renderCalendar()}</>;
}

export default CalendarComponent;
