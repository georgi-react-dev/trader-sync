export const getYearMonths = (currentYear, data) => {
  const months = data.reduce((item, value) => {
    const year = value.year_month_date?.split(".")[0];
    const month = value.year_month_date?.split(".")[1];
    if (year === currentYear) {
      item.push(month);
    }
    return item;
  }, []);
  return Array.from(new Set(months));
};
