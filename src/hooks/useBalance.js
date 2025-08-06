import { useState, useEffect } from "react";
import httpClient from "../api/httpClient";
import { useAuth } from "../context/AuthContext";
const useBalance = (url, selectedDate) => {
  const [balance, setBalance] = useState(null);
  const [totalNetProfit, setTotalNetProfit] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token, user, refetch, setRefetch } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Replace 'your_api_endpoint' with the actual API endpoint
      try {
        const response = await httpClient.get(
          "/getAccountBalance",

          {
            headers: { Authorization: `Bearer ${token}` },
            params: { accountId: user?.id },
          }
        );
        //setSelectedDate(new Date(response.data.trades[0].trade_date));
        console.log({ response });

        setBalance(response.data.balance);
        setTotalNetProfit(response.data.net_profit);
        setRefetch(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    token && user && fetchData();
  }, [selectedDate, token, user, refetch, setRefetch]);

  return { balance, totalNetProfit, loading };
};

export default useBalance;
