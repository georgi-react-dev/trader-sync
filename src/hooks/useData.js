import { useState, useEffect } from "react";
import httpClient from "../api/httpClient";
const useData = (selectedDate) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Replace 'your_api_endpoint' with the actual API endpoint
      const response = await httpClient.get("/getTrades", {
        params: {
          year_month_date: `${selectedDate.getFullYear()}.${
            selectedDate.getMonth() + 1 < 10
              ? `0${selectedDate.getMonth() + 1}`
              : selectedDate.getMonth() + 1
          }`,
        },
      });
      console.log({ REZULTS: response.data.trades });

      setData(response.data.trades);
    };
    selectedDate && fetchData();
  }, [selectedDate]);

  return { data };
};

export default useData;
