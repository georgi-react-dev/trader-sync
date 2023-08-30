import React, { useState } from "react";
import SwitchButton from "../buttons/SwitchButton";

import { DashboardHeader } from "../../routes/Dashboard";

function Trend() {
  const [switchOn, setSwitchOn] = useState(false);

  const handleSwitchToggle = (e) => {
    setSwitchOn((prev) => !prev);
  };

  const intervals = [
    "D",
    "H4",
    "H3",
    "H2",
    "H1",
    "45",
    "30",
    "15",
    "5",
    "3",
    "2",
    "1",
  ];
  const intervalGroups = [];
  for (let i = 0; i < intervals.length; i += 6) {
    intervalGroups.push(intervals.slice(i, i + 6));
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <DashboardHeader>
        <h1>Trend Analize</h1>
      </DashboardHeader>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          color: "#fff",
          marginTop: "2rem",
        }}
      >
        <div style={{ display: "flex", gap: "3rem" }}>
          {intervalGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              style={{
                border: "0.5px solid rgb(241 241 241 / 31%)",
                padding: "1rem",
              }}
            >
              {group.map((item, index) => (
                <label
                  key={item}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    color: "#fff",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3 style={{ width: "30px" }}>{item}</h3>
                  <span>Buy</span>
                  <SwitchButton
                    on={switchOn}
                    onClick={() => setSwitchOn((prev) => !prev)}
                  />
                  <span>Sell</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Trend;
