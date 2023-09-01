import { useState, useEffect } from "react";
import httpClient from "../api/httpClient";
import { useAuth } from "../context/AuthContext";
const useBalance = (url, selectedDate) => {
  const [balance, setBalance] = useState(null);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      // Replace 'your_api_endpoint' with the actual API endpoint
      const response = await httpClient.get("/accountInfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log({ REZULTS22222: response.data });
      //setSelectedDate(new Date(response.data.trades[0].trade_date));
      setBalance(response.data.balance);
    };
    fetchData();
  }, [selectedDate, token]);

  return { balance };
};

export default useBalance;
