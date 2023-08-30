import { useState, useEffect } from "react";
import axios from "axios";
const useData = (selectedDate) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Replace 'your_api_endpoint' with the actual API endpoint
      const response = await axios.get(
        "https://doubtful-fawn-baseball-cap.cyclic.app/getTrades",
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

      setData(response.data.trades);
    };
    selectedDate && fetchData();
  }, [selectedDate]);

  return { data };
};

export default useData;
