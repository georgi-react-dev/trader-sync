import React from "react";

import { DayContainerWrapper } from "./styles";
import {
  getDayDealsProfit,
  getDayDealsInfo,
  getDayDealsLength,
  getPipsForDay,
} from "../helper";
import format from "date-fns/format";

function DayContainer({
  data,
  year,
  month,
  day,
  setDealsInfo,
  setShowModal,
  index,
}) {
  //   console.log({ DayContainer: data });
  const profit = getDayDealsProfit(
    format(new Date(year, month, day), "yyyy.MM.dd"),
    data
  );
  //   console.log({ DayPROFIT: profit });
  const getDayContainerBackground = (profit) => {
    if (!profit) return "";
    return profit >= 0 ? " profit" : " loss";
  };
  const dealsLength = getDayDealsLength(
    format(new Date(year, month, day), "yyyy.MM.dd"),
    data
  );

  const pips = getPipsForDay(
    format(new Date(year, month, day), "yyyy.MM.dd"),
    data
  );
  return (
    <DayContainerWrapper
      className={"day-container" + getDayContainerBackground(profit)}
      style={{
        width: "100px",
        height: "100px",
      }}
      key={day > 0 ? day : day + "_" + index}
      onClick={() => {
        setDealsInfo(
          getDayDealsInfo(
            format(new Date(year, month, day), "yyyy.MM.dd"),
            data
          )
        );

        setShowModal(true);
      }}
      data-date={format(new Date(year, month, day), "yyyy.MM.dd")}
      data-profit={profit}
      data-deals-length={dealsLength}
    >
      <div className="inner-container">
        <span>{day}</span>

        <div style={{ marginTop: "1rem" }}>
          <div>
            {dealsLength}
            <br />
            {pips}
          </div>
          <strong>{profit ? "$" + profit : null}</strong>
        </div>
      </div>
    </DayContainerWrapper>
  );
}

export default DayContainer;
