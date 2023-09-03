export const getYears = (data) => {
  const years = data.reduce((item, value) => {
    const year = value.year_month_date?.split(".")[0];
    item.push(year);
    return item;
  }, []);
  return Array.from(new Set(years));
};
