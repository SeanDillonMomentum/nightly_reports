import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField
} from "@material-ui/core";
import styled from "styled-components";

const StyledTable = styled(Table)`
  .headerCells {
    line-height: 1;
    font-size: 18px;
    color: #707070;
    text-align: center;
    border-bottom: 1px solid #707070;
    border-top: 1px solid #707070;
  }
  .rowCells {
    line-height: 0.7;
    color: #313e50;
    text-align: center;
    font-size: 14px;
  }
`;

const dataSet = [
  {
    name: "Bob",
    address: "123 kisimmee",
    date: "10/30/2019",
    dcSize: "1.2 kW"
  },
  {
    name: "Dave",
    address: "123 kisimmee",
    date: "10/30/2019",
    dcSize: "1.2 kW"
  },
  {
    name: "Chris",
    address: "123 kisimmee",
    date: "10/30/2019",
    dcSize: "1.2 kW"
  },
  {
    name: "Laura",
    address: "123 kisimmee",
    date: "10/30/2019",
    dcSize: "1.2 kW"
  },
  {
    name: "Daniel",
    address: "123 kisimmee",
    date: "10/30/2019",
    dcSize: "1.2 kW"
  }
];

const fullData = {
  name: "",
  address: "",
  jobType: "",
  date: "",
  foreman: "",
  crewDesignator: "",
  sp: "",
  os: "",
  crewCount: "",
  electricalTotal: "",
  installationTotal: "",
  roundTrip: "",
  correctPic: "",
  onsiteRevision: "",
  salesRepVisit: "",
  faOnSite: "",
  panelType: "",
  panelCount: "",
  dcSize: "",
  panelsInstalled: "",
  constructionComplete: "",
  notes: ""
};
const titles = [
  "Customer Name",
  "Customer Address",
  "Job Type",
  "Date",
  "Foreman",
  "Crew Designator",
  "S/P",
  "O/S",
  "Crew Count",
  "Electrical Total (Hours)",
  "Installation Total (Hours)",
  "Round Trip Travel Total (Hours)",
  "Correct Pic (Y/N)",
  "Onsite Revision",
  "Sales Rep Visit",
  "FA On Site",
  "Panel Type",
  "Panel Count",
  "DC Size (kW)",
  "Panels Installed",
  "Construction Complete",
  "Notes"
];

const createRows = (reportData, createInput) => {
  let all = [];
  for (let i = 0; i < reportData.length; i++) {
    let mapped = [];
    for (let x = 0; x < Object.keys(fullData).length; x++) {
      //   mapped.push(createInput())
      mapped.push(createInput(Object.keys(fullData)[x], i, "text", x));
    }
    all.push(<TableRow key={i}>{mapped}</TableRow>);
  }
  return all;
};

const NightlyReport = () => {
  const [reportData, setReportData] = useState();

  useEffect(() => {
    const newData = dataSet.reduce((array, curr) => {
      array.push({ ...fullData, ...curr });
      return array;
    }, []);
    setReportData(newData);
  }, []);

  const changeData = (index, name, e) => {
    let mutable = [...reportData];
    mutable[index][name] = e.target.value;
    setReportData(mutable);
  };

  const createInput = (name, index, type, x) => {
    switch (type) {
      case "text": {
        return (
          <TableCell className="rowCells" key={`${index}${x}`}>
            <TextField
              name={name}
              value={reportData[index][type]}
              onChange={e => changeData(index, name, e)}
            />
          </TableCell>
        );
      }
      default: {
        return (
          <TableCell className="rowCells" key={`${index}${x}`}>
            <TextField
              name={name}
              value={reportData[index][type]}
              onChange={e => changeData(index, name, type, e)}
            />
          </TableCell>
        );
      }
    }
  };

  //   const rowCreator = reportData
  //     ? reportData.map((row, index) => {
  //         let mapped = [];
  //         for (let x = 0; x < Object.keys(fullData).length; x++) {
  //           //   mapped.push(createInput())
  //           mapped.push(createInput(Object.keys(fullData)[x], index, "text", x));
  //         }
  //         //   console.log(mapped);
  //         return <TableRow key={index}>{mapped}</TableRow>;
  //       })
  //     : null;

  //   console.log(reportData);
  //   if (reportData) console.log(rowCreator(reportData, createInput));

  //   console.log(reportData);
  return !reportData ? (
    <div>Loading</div>
  ) : (
    <StyledTable>
      <TableHead>
        <TableRow>
          {titles.map((x, index) => (
            <TableCell key={index} className="headerCells">
              {x}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {rowCreator} */}
        {createRows(reportData, createInput)}
        {/* {reportData.map((row, index) => <TableRow key={index}>
              {Object.keys((row, i) => <TableCell key={i}>{createInput(key, index, "text")}</TableCell>)}
          </TableRow>)} */}
      </TableBody>
    </StyledTable>
  );
};

export default NightlyReport;
