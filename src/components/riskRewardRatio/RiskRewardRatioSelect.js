import React, { useState } from "react";
import styled from "styled-components";
const Select = styled.select`
  background-color: #252b3d;
  color: white;
  padding: 5px;
  width: 150px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  -webkit-appearance: button;
  appearance: button;
  outline: none;
`;

function RiskRewardRatioSelect({ ratio, onSetRiskRewardRatio }) {
  const [value, setValue] = useState(ratio || "Choose");

  const options = [
    "Choose",
    "1/1",
    "1/1.5",
    "1/2",
    "1/2.5",
    "1/3",
    "1/3.5",
    "1/4",
    "1/4.5",
    "1/5",
    "1/5.5",
  ];

  return (
    <Select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSetRiskRewardRatio(e.target.value);
      }}
    >
      {options.map((option) => {
        return <option value={option}>{option}</option>;
      })}
    </Select>
  );
}

export default RiskRewardRatioSelect;
