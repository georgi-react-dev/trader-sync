import React, { useState } from "react";
import useBalance from "../hooks/useBalance";
import { styled } from "styled-components";
import { UploadForm } from "../components/form/UploadForm";
import useData from "../hooks/useData";
import YearChart from "../components/charts/YearChart/YearChart";
import { getYears } from "../components/charts/YearChart/helper/index";
import MonthChart from "../components/charts/monthChart/MonthChart";
import ClipLoader from "react-spinners/ClipLoader";
export const DashboardHeader = styled.div`
  border-bottom: 1px solid #888;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;

  h1 {
    // position: relative;
    // left: 1rem;
  }
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
  const { balance, loading } = useBalance();

  const { data: tradesData, loading: loaddingTradesData } = useData("all");
  console.log({ tradesData });
  const [year, setYear] = useState("All");
  const showMonthChartByYear = (year) => {
    alert(year);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <DashboardHeader className="header">
        <h1>Dashboard</h1>
        <UploadForm />
      </DashboardHeader>

      <DashBoardItem>
        {loading ? (
          <ClipLoader
            color={"#36d7b7"}
            loading={loading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <div>Net P&L</div>
            <span className="balance">${balance}</span>
          </>
        )}
      </DashBoardItem>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          key={year}
          style={{
            border: "1px solid #333",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={() => setYear("All")}
        >
          All
        </div>

        {getYears(tradesData).map((year) => {
          return (
            <div
              key={year}
              style={{
                border: "1px solid #333",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              onClick={() => setYear(year)}
            >
              {year}
            </div>
          );
        })}
      </div>
      {tradesData.length > 0 && year === "All" && (
        <YearChart data={tradesData} />
      )}
      {year !== "All" && <MonthChart year={year} data={tradesData} />}
    </div>
  );
}

export default Dashboard;
