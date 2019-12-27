import React from "react";
import { TableRow } from "@material-ui/core";

const Rows = ({ length, reportData, createInput }) =>
  reportData.map((row, index) => {
    let mapped = [];
    for (let x = 0; x < Object.keys(row).length; x++) {
      //   mapped.push(createInput())
      mapped.push(createInput(Object.keys(row)[x], index, "text", x));
    }
    //   console.log(mapped);
    return <TableRow key={index}>{mapped}</TableRow>;
  });

export default Rows;
