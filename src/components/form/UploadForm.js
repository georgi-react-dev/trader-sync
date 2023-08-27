import React, { useState, useRef } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
const UploadButton = styled.button`
  background: #123456;
  color: #fff;
  outline: 0;
  border: 0.5px solid #ffffff4a;
  padding: 10px;
  /* font-size: 1.05rem; */
  cursor: pointer;
`;

export const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
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
      let balance = "";
      reader.onload = () => {
        const fileContent = reader.result;
        const regex = /<tr bgcolor(.*) align="right">([\s\S]*?)<\/tr>/g;
        const tableRows = fileContent.match(regex);
        const dateAndTimeArr = [];
        const profitArr = [];
        const regexBalance =
          /<td (.*)>Balance:<\/td>\s+<td (.*)<b>(.*)<\/b><\/td>/gm;

        const pattern =
          /<td (.*)>Balance:<\/td>\s+<td colspan="2"><b>(.*?)<\/b><\/td>/;
        const matches = fileContent.match(pattern);

        if (matches) {
          console.log({ matches });
          const balanceValue = matches[2];
          balance = balanceValue;
          console.log("Balance:", balanceValue);
        } else {
          console.log("Balance not found");
        }
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
          .post(`https://doubtful-fawn-baseball-cap.cyclic.app/accountInfo`, {
            balance: balance,
          })
          .then((response) => {
            console.log("Response from server:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        axios
          .post(`https://doubtful-fawn-baseball-cap.cyclic.app/saveTrades`, {
            tradesData: profitArr,
          })
          .then((response) => {
            console.log("Response from server:", response.data);
            navigate("/calendar");
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
        // onUpload({ date: [...new Set(dateAndTimeArr)], data: profitArr });
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <UploadButton onClick={handleButtonClick}>+ Import Trades</UploadButton>
    </>
  );
};
