import React, { useState, useEffect } from "react";
import SwitchButton from "../buttons/SwitchButton";

import { DashboardHeader } from "../../routes/Dashboard";
import { isNumber } from "lodash";

function SizeCalculator() {
  const [riskUsd, setRiskUsd] = useState(null);
  const [riskPips, setRiskPips] = useState(null);
  const [positionSize, setPositionSize] = useState(null);

  useEffect(() => {
    const size = riskUsd / (riskPips * 10);
    console.log({ size: Math.round(size * 100) / 100 });
    console.log({ riskUsd, riskPips });

    setPositionSize(Math.round(size * 100) / 100);
  }, [riskUsd, riskPips]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <DashboardHeader>
        <h1>Size Calculator</h1>
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
          <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
            <label>Risk USD</label>
            <input
              type="text"
              onChange={(e) => setRiskUsd(Number(e.target.value))}
            />
          </div>
          <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
            <label>Risk Pips</label>
            <input
              type="text"
              onChange={(e) => setRiskPips(Number(e.target.value))}
            />
          </div>
          <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
            <label>Position size</label>
            <input
              type="text"
              readOnly
              value={isNumber(positionSize) ? positionSize : ""}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SizeCalculator;
