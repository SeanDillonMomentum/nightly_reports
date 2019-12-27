import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { StyledTableContainer } from "./styles";

const titleArray = ["none", "Total Picks", "Picks Correct", "Picks Accuracy"];

const Picks = ({ data, offices }) => {
  const [currIndex, setCurrIndex] = useState(1);

  return (
    <StyledTableContainer>
      <div className="barGraph">
        <Bar
          height={100}
          options={{
            legend: {
              labels: {
                fontSize: 24
              }
            },
            scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
          }}
          data={{
            labels: offices,
            datasets: [
              {
                label: titleArray[currIndex],
                data: data.map(x =>
                  currIndex !== 3 ? x[currIndex] : x[currIndex].split("%")[0]
                ),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)"
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)"
                ],
                borderWidth: 1
              }
            ]
          }}
        />
      </div>
      <div className="tableDiv">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Office</TableCell>
              <TableCell onClick={() => setCurrIndex(1)}>Total Picks</TableCell>
              <TableCell onClick={() => setCurrIndex(2)}>
                Picks Correct
              </TableCell>
              <TableCell onClick={() => setCurrIndex(3)}>
                Pick Accuracy
              </TableCell>
              {/* <TableCell onClick={() => setCurrIndex(4)}>
                Total kW Panels Installed (Construction Complete)
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((x, index) => (
              <TableRow key={index}>
                {x.map((y, index) => (
                  <TableCell key={index}>{y}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </StyledTableContainer>
  );
};

export default Picks;
