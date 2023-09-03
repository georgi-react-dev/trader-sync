import React, { useState } from "react";
import useBalance from "../hooks/useBalance";
import { styled } from "styled-components";
import { UploadForm } from "../components/form/UploadForm";
import useData from "../hooks/useData";
import YearChart from "../components/charts/YearChart/YearChart";
import { getYears } from "../components/charts/YearChart/helper/index";
import MonthChart from "../components/charts/monthChart/MonthChart";
export const DashboardHeader = styled.div`
  border-bottom: 1px solid #888;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`;

const DashBoardItem = styled.div`
  background: #f7f7f7;
  width: 150px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #555;
  font-weight: bold;
  border-radius: 10px;
  .header {
  }
  .balance {
    color: #125c51;
    font-size: 1.2rem;
  }
`;

function Dashboard() {
  const { balance } = useBalance();
  const { data: tradesData, loading } = useData("all");
  console.log({ tradesData });
  const [year, setYear] = useState();
  const showMonthChartByYear = (year) => {
    alert(year);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <DashboardHeader className="header">
        <h1>Dashboard</h1>
        <UploadForm />
      </DashboardHeader>
      {balance && (
        <DashBoardItem>
          <div>Net P&L</div>
          {!balance ? null : <span className="balance">${balance}</span>}
        </DashBoardItem>
      )}
      <div style={{ display: "flex" }}>
        {getYears(tradesData).map((year) => {
          return (
            <div
              key={year}
              style={{
                border: "1px solid #333",
                borderRadius: "5px",
                padding: "5px",
                cursor: "pointer",
              }}
              onClick={() => setYear(year)}
            >
              {year}
            </div>
          );
        })}
      </div>
      {tradesData.length > 0 && !year && <YearChart data={tradesData} />}
      {year && <MonthChart year={year} data={tradesData} />}
    </div>
  );
}

export default Dashboard;
