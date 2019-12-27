import React, { useState, useEffect, useRef } from "react";
import { ViewColumn, Check } from "@material-ui/icons";
import { headers } from "../../utils/dataHelpers";
import { StyledList } from "./styles";
import styled from "styled-components";

const StyledCheckbox = styled(Check)`
  color: ${props => props.colorProp};
  font-size: 14px;
`;

const FilterDiv = ({ setHidden, hidden }) => {
  const node = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  });

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

  const handleClick = e => {
    if (node && node.current && node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };
  return (
    <StyledList right="40px">
      <ViewColumn className="iconButton" onClick={() => setOpen(true)} />
      {open && (
        <div className="ternaryContainer" ref={node}>
          <ul>
            {headers.map((header, index) => (
              <li key={index} onClick={() => hiddenToggle(index)}>
                {header}{" "}
                <StyledCheckbox
                  colorProp={hidden.indexOf(index) !== -1 ? "red" : "green"}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </StyledList>
  );
};

export default FilterDiv;
