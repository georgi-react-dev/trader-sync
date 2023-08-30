import intervalToDuration from "date-fns/intervalToDuration";

export const getTradeDuration = (start, end) => {
  const obj = intervalToDuration({
    start: new Date(start),
    end: new Date(end),
  });
  // days: 0;
  // hours: 0;
  // minutes: 9;
  // months: 0;
  // seconds: 24;
  // years: 0;

  let string = "";
  Object.entries(obj).map((value, key, arr) => {
    if (value[1] > 0 && value[0] !== "seconds") {
      string += value[0].toUpperCase() + ": " + value[1] + " ";
      // string += value[0].toUpperCase() + ": " + value[1] + " ";
    }
  });

  return string;
};
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

export const getPipsForDay = (currentDay, data) => {
  const pips = (data, key) => {
    return data.reduce((acc, value) => {
      if (value.trade_date === key) {
        const pips = (value.profit / value.volume) * 0.1;
        acc += pips;
      }
      return acc;
    }, 0);
  };

  const profit = pips(data, currentDay);
  if (!profit) return null;
  //format(new Date(year, month, day), "yyyy.MM.dd");
  return `pips ${profit.toFixed(2)} `;
};

export const getPipsForMonth = (data) => {
  const monthPips = (data, key) => {
    return data.reduce((acc, value) => {
      // if (value.trade_date === key) {
      const pips = (value.profit / value.volume) * 0.1;
      acc += pips;
      // }
      return acc;
    }, 0);
  };

  const profit = monthPips(data);
  if (!profit) return null;
  //format(new Date(year, month, day), "yyyy.MM.dd");
  return `Pips: ${profit.toFixed(2)} `;
};

export const getTradesForMonth = (data) => {
  const monthTrades = (data, key) => {
    return data.reduce((acc, value) => {
      // if (value.trade_date === key) {

      acc += 1;
      // }
      return acc;
    }, 0);
  };

  const trades = monthTrades(data);
  if (!trades) return null;
  //format(new Date(year, month, day), "yyyy.MM.dd");
  return `Trades: ${trades} `;
};
// export const getPipsForDay = (currentDay, data) => {
//   const arrByKey = (data, key) => {
//     return data.reduce((arr, value) => {
//       if (value.trade_date === key) {
//         const pips = Math.abs((value.profit / value.volume) * 0.1);
//         acc += +pips;
//       }
//       return arr;
//     }, 0);
//   };

//   const finalArr = arrByKey(data, currentDay);
//   if (!finalArr) return null;
//   //format(new Date(year, month, day), "yyyy.MM.dd");
//   return finalArr;
// };

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

export const getWeekDays = (isBussinessDays) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const bussinessDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  let daysToShow = isBussinessDays ? bussinessDays : daysOfWeek;
  const days = daysToShow.map((day) => (
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

export const nthSum = (arr) => {
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
