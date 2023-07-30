import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Calendar from "./components/calendar/Calendar";
import { UploadForm } from "./components/form/UploadForm";
import React, { useState, useEffect } from "react";
import DealsTable from "./components/deals/DealsTable";
function App() {
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);

  const getData = (obj) => {
    setData(null);
    setDate(null);
    console.log({ obj });
    setDate(obj.date[0]);
    setData(obj.data);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Replace 'your_api_endpoint' with the actual API endpoint
  //     const response = await axios.get("http://localhost:3005/getTrades");
  //     console.log({ REZULTS: response.data.trades });
  //     setDate(response.data.trades[0].trade_date);
  //     setData(response.data.trades);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="App">
      <UploadForm onUpload={(obj) => getData(obj)} />
      <Calendar />
      {/* {data && <DealsTable dealsInfo={data} />} */}
    </div>
  );
}

export default App;
