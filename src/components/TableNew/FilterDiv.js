import React, { useState } from "react";
import { ViewColumn, Check } from "@material-ui/icons";

import { StyledList } from "./styles";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from "@material-ui/core";
const StyledCheckbox = styled(Check)`
  color: ${props => props.colorprop};
  font-size: 14px;
`;

const FilterDiv = ({ setHidden, hidden, headers }) => {
  const [open, setOpen] = useState(false);
  const hiddenToggle = index => {
    let hiddenCopy = [...hidden];
    let a = hidden.indexOf(index);
    if (a !== -1) {
      hiddenCopy.splice(a, 1);
      setHidden(hiddenCopy);
    } else {
      setHidden([...hidden, index]);
    }
  };

  return (
    <StyledList right="40px">
      <ViewColumn className="iconButton" onClick={() => setOpen(true)} />
      {open && (
        <Modal openState={open} width="90%" handleClose={() => setOpen(false)}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell
                    style={{ padding: "5px", textAlign: "center" }}
                    key={index}
                    onClick={() => hiddenToggle(index)}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {headers.map((_, index) => (
                  <TableCell
                    style={{ padding: "5px", textAlign: "center" }}
                    key={index}
                    onClick={() => hiddenToggle(index)}
                  >
                    <StyledCheckbox
                      colorprop={hidden.indexOf(index) !== -1 ? "red" : "green"}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Modal>
      )}
    </StyledList>
  );
};

export default FilterDiv;
