import React, { useState, useRef } from "react";
import axios from "axios";
export const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Do something with the file
    handleFormSubmit(file);
  };

  const handleFormSubmit = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        const regex = /<tr bgcolor(.*) align="right">([\s\S]*?)<\/tr>/g;
        const tableRows = fileContent.match(regex);
        const dateAndTimeArr = [];
        const profitArr = [];

        if (tableRows) {
          tableRows.forEach((row) => {
            const tdRegex = /<td[^>]*>(.*?)<\/td>/g;
            const tds = row.match(tdRegex);
            console.log({ tds });
            if (tds && tds.length === 14) {
              dateAndTimeArr.push(
                tds[0]
                  .replace(/<\/?td[^>]*>/g, "")
                  .match(/(\d{4}.\d{2}.\d{2})/g)[0]
              );
              var obj = {};
              obj.date = tds[0]
                .replace(/<\/?td[^>]*>/g, "")
                .match(/(\d{4}.\d{2}.\d{2})/g)[0];
              obj.trade_date = tds[0]
                .replace(/<\/?td[^>]*>/g, "")
                .match(/(\d{4}.\d{2}.\d{2})/g)[0];
              obj.year_month_date = tds[0]
                .replace(/<\/?td[^>]*>/g, "")
                .match(/(\d{4}.\d{2})/g)[0];

              // obj.profit = tds[13].replace(/<\/?td[^>]*>/g, "");
              // obj.swap = tds[12].replace(/<\/?td[^>]*>/g, "");
              // profitArr.push(obj);
              obj.position = tds[1].replace(/<\/?td[^>]*>/g, "");
              obj.symbol = tds[2].replace(/<\/?td[^>]*>/g, "");
              obj.type = tds[3].replace(/<\/?td[^>]*>/g, "");
              obj.volume = tds[5].replace(/<\/?td[^>]*>/g, "");
              obj.startPrice = tds[6].replace(/<\/?td[^>]*>/g, "");
              obj.stopLost = tds[7].replace(/<\/?td[^>]*>/g, "");
              obj.takeProfit = tds[8].replace(/<\/?td[^>]*>/g, "");
              obj.timeOpen = tds[0].replace(/<\/?td[^>]*>/g, "");
              obj.timeClose = tds[9].replace(/<\/?td[^>]*>/g, "");
              obj.endPrice = tds[10].replace(/<\/?td[^>]*>/g, "");
              obj.profit = tds[13].replace(/<\/?td[^>]*>/g, "");
              obj.swap = tds[12].replace(/<\/?td[^>]*>/g, "");
              profitArr.push(obj);
            }
          });
        }
        axios
          .post("http://localhost:3005/saveTrades", { tradesData: profitArr })
          .then((response) => {
            console.log("Response from server:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        console.log("First Array:");
        const dates = [...new Set(dateAndTimeArr)];
        console.log("Second Array:", profitArr);
        const yearMonthObject = {};

        for (const date of dates) {
          const [year, month, day] = date.split(".");
          if (!yearMonthObject.hasOwnProperty(year)) {
            yearMonthObject[year] = {};
          }
          if (!yearMonthObject[year].hasOwnProperty(month)) {
            yearMonthObject[year][month] = [];
          }
          if (!yearMonthObject[year][month].includes(day)) {
            yearMonthObject[year][month].push(day);
          }
        }

        console.log({ yearMonthObject });
        onUpload({ date: [...new Set(dateAndTimeArr)], data: profitArr });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        marginBottom: "2rem",
        width: "500px",
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={handleButtonClick}>Upload File</button>
    </div>
  );
};
