import { useState, useEffect } from "react";
import httpClient from "../api/httpClient";
import { useAuth } from "../context/AuthContext";
const useData = (selectedDate = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let params = {};
      if (selectedDate === "all") {
        params = {
          accountId: user.id,
        };
      } else {
        params = {
          year_month_date: `${selectedDate.getFullYear()}.${
            selectedDate.getMonth() + 1 < 10
              ? `0${selectedDate.getMonth() + 1}`
              : selectedDate.getMonth() + 1
          }`,
          accountId: user.id,
        };
      }
      // Replace 'your_api_endpoint' with the actual API endpoint
      const response = await httpClient.get("/getTrades", {
        params,
      });
      console.log({ REZULTS: response.data.trades });

      setData(response.data.trades);
      setLoading(false);
    };
    selectedDate && fetchData();
  }, [selectedDate, user.id]);

  return { data, loading };
};

export default useData;
