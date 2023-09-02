import { useState, useEffect } from "react";
import httpClient from "../api/httpClient";
const useData = (selectedDate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    };
    selectedDate && fetchData();
  }, [selectedDate]);

  return { data, loading };
};

export default useData;
