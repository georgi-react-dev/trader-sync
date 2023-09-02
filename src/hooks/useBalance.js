import { useState, useEffect } from "react";
import httpClient from "../api/httpClient";
import { useAuth } from "../context/AuthContext";
const useBalance = (url, selectedDate) => {
  const [balance, setBalance] = useState(null);
  const { token, user, refetch, setRefetch } = useAuth();
  console.log({ refetch });
  useEffect(() => {
    const fetchData = async () => {
      // Replace 'your_api_endpoint' with the actual API endpoint
      const response = await httpClient.get(
        "/accountInfo",

        {
          headers: { Authorization: `Bearer ${token}` },
          params: { accountId: user?.id },
        }
      );
      console.log({ REZULTS22222: response.data });
      //setSelectedDate(new Date(response.data.trades[0].trade_date));
      setBalance(response.data.balance);
      setRefetch(false);
    };
    fetchData();
  }, [selectedDate, token, user?.id, refetch, setRefetch]);

  return { balance };
};

export default useBalance;
