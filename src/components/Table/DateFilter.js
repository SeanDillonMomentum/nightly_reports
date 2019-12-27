import React from "react";
import styled from "styled-components";

const StyledDateFilter = styled.div`
  background-color: ${props => props.theme.midnightBlue};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  .buttonDiv {
    color: white;
    padding: 10px;
    &:first-child {
      border-right: 1px solid white;
    }
    &:last-child {
      border-left: 1px solid white;
    }
  }
`;

const DateFilter = ({ dateFilter, setDateFilter }) => {
  const check = value => {
    if (value === dateFilter) return { color: "#00aeef" };
    return null;
  };
  return (
    <StyledDateFilter>
      <div
        style={check("allTime")}
        className="buttonDiv"
        onClick={() => setDateFilter("allTime")}
      >
        All Time
      </div>
      <div
        style={check("today")}
        className="buttonDiv"
        onClick={() => setDateFilter("today")}
      >
        Today
      </div>
      <div
        style={check("lastWeek")}
        className="buttonDiv"
        onClick={() => setDateFilter("lastWeek")}
      >
        Last Week
      </div>
      <div
        style={check("lastMonth")}
        className="buttonDiv"
        onClick={() => setDateFilter("lastMonth")}
      >
        Last Month
      </div>
    </StyledDateFilter>
  );
};

export default DateFilter;
