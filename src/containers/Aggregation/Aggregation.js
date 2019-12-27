import React, { useState } from "react";
import dataTest from "../View/testObj.json";
import { TextField } from "@material-ui/core";
import moment from "moment";
import styled from "styled-components";
import aggregate from "./aggregate";
import Installs from "./installs.js";
import PanelsInstalled from "./panelsinstalled.js";
import Picks from "./picks.js";
import Revisions from "./revisions.js";
import SalesRepOnSite from "./salesreponsite.js";
const ReportBuilderForm = styled.form`
  display: flex;
  align-items: center;
  padding: 30px;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 100;
  border-bottom: 2px solid lightgray;
  .textField {
    margin-right: 15px;
  }
  .buttonContainer {
    margin-left: 45px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .currentTitle {
    padding: 0 15px;
  }
`;

const StyledButton = styled.button`
  padding: 12px 36px;
  /* border-radius: 30px; */
  font-size: 18px;
  background-color: ${props => props.theme.lightBlue};
  color: #fff;
  border: 2px solid transparent;
  opacity: ${props => (props.opacityProp ? "0.8" : "1")};
  outline: none;
  &:hover {
    opacity: 0.8;
    transition: all 0.3s;
  }
  &:first-child {
    border-radius: 30px 0 0 30px;
  }
  &:last-child {
    border-radius: 0 30px 30px 0;
  }
`;
const tableTitles = [
  "Installs",
  "Panels Installed",
  "Picks",
  "Revisions",
  "Sales Rep On Site"
];

const Aggregation = () => {
  const [fromDate, setFromDate] = useState(
    moment()
      .subtract(7, "days")
      .format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [currTable, setCurrTable] = useState(0);
  const handleSubmit = e => {
    e.preventDefault();
  };
  const {
    installs,
    offices,
    panelsInstalled,
    picks,
    revisions,
    salesRepsOnSite
  } = aggregate(dataTest, fromDate, toDate);
  return (
    <>
      <ReportBuilderForm onSubmit={handleSubmit}>
        <TextField
          id="start"
          label="Start Date"
          type="date"
          value={fromDate}
          className="textField"
          onChange={e => setFromDate(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="end"
          label="End Date"
          type="date"
          value={toDate}
          className="textField"
          onChange={e => setToDate(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
        <div className="buttonContainer">
          {tableTitles.map((x, index) => (
            <StyledButton
              key={index}
              opacityProp={index === currTable}
              onClick={() => setCurrTable(index)}
            >
              {x}
            </StyledButton>
          ))}
        </div>
      </ReportBuilderForm>
      <div style={{ paddingTop: "90px" }}>
        {currTable === 0 && <Installs data={installs} offices={offices} />}
        {currTable === 1 && (
          <PanelsInstalled data={panelsInstalled} offices={offices} />
        )}
        {currTable === 2 && <Picks data={picks} offices={offices} />}
        {currTable === 3 && <Revisions data={revisions} offices={offices} />}
        {currTable === 4 && (
          <SalesRepOnSite data={salesRepsOnSite} offices={offices} />
        )}
      </div>
    </>
  );
};
export default Aggregation;
