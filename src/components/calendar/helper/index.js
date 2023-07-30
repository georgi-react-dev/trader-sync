export const getDayDealsLength = (currentDay, data) => {
  const countByKey = (data, key) => {
    return data.reduce((count, value) => {
      if (value.trade_date === key) {
        count++;
      }
      return count;
    }, 0);
  };

  const count = countByKey(data, currentDay);
  if (!count) return null;
  //format(new Date(year, month, day), "yyyy.MM.dd");
  return `${count} Trades`;
};

export const getDayDealsProfit = (currentDay, data) => {
  const dayProfit = (data, key) => {
    return data.reduce((acc, value) => {
      if (value.trade_date === key) {
        acc += +value.profit;
      }
      return acc;
    }, 0);
  };

  const profit = dayProfit(data, currentDay);
  if (!profit) return null;
  //format(new Date(year, month, day), "yyyy.MM.dd");
  return `${profit.toFixed(2)} `;
};

export const getDayDealsInfo = (currentDay, data) => {
  const arrByKey = (data, key) => {
    return data.reduce((arr, value) => {
      if (value.trade_date === key) {
        arr.push(value);
      }
      return arr;
    }, []);
  };

  const finalArr = arrByKey(data, currentDay);
  if (!finalArr) return null;
  //format(new Date(year, month, day), "yyyy.MM.dd");
  return finalArr;
};

export const getWeekDays = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const days = daysOfWeek.map((day) => (
    <div className="test" style={{ color: "#fff", width: "150px" }} key={day}>
      {day}
    </div>
  ));

  return days;
};

export const getMonthlyWeeklyProfits = (data) => {
  // Sort the data array by date in ascending order

  // Sort the data array by date in ascending order
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  const startDate = new Date(data[0].date);
  const endDate = new Date(data[data.length - 1].date);
  console.log({ endDate });
  const numWeeks =
    Math.ceil((endDate - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;

  const weeklyProfits = new Array(numWeeks).fill(0);

  for (let i = 0; i < data.length; i++) {
    const currentDate = new Date(data[i].date);
    const currentProfit = Number(data[i].profit);
    const weekIndex = Math.floor(
      (currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)
    );

    weeklyProfits[weekIndex] += currentProfit;
  }

  return weeklyProfits;
};
