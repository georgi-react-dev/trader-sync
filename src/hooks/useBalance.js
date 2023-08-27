import { useState, useEffect } from "react";
import axios from "axios";
const useBalance = (url, selectedDate) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Replace 'your_api_endpoint' with the actual API endpoint
      const response = await axios.get("http://localhost:3005/accountInfo");
      console.log({ REZULTS22222: response.data });
      //setSelectedDate(new Date(response.data.trades[0].trade_date));
      setBalance(response.data.balance);
    };
    fetchData();
  }, [selectedDate]);

  return { balance };
};

export default useBalance;
