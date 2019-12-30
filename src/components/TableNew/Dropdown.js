import React from "react";
//styles
import styled from "styled-components";
//components
import { MenuItem, Menu } from "@material-ui/core";
import TableButton from "./TableButton";

const StyledButton = styled(TableButton)`
  margin: 5px;
  font-size: 17px;
  background-color: #ffffff;
  border-radius: 5px;
  outline: none;
  color: ${props => props.theme.slateGrey};
  width: 75px;
  border: 1px solid ${props => props.theme.backgroundLightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 1px;
  width: ${props => props.width};
  margin-right: ${props => props.marginRight};
`;

const Dropdown = ({
  open,
  handleDropdown,
  anchorEl,
  handleClose,
  setRowsPerPage,
  items,
  rowValue,
  width
}) => (
  <>
    <StyledButton
      width={width}
      className="button"
      aria-owns={open ? "menu-appbar" : undefined}
      aria-haspopup="true"
      onClick={handleDropdown}
      arrow={true}
      arrowDirection={open ? true : false}
      text={rowValue}
    />
    <Menu
      anchorEl={anchorEl}
      id="menu-appbar"
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={open}
      onClose={() => handleClose(null)}
    >
      {items.map(item => {
        return (
          <MenuItem
            onClick={() => {
              setRowsPerPage(item);
              handleClose();
            }}
            key={item}
            value={item}
          >
            {item}
          </MenuItem>
        );
      })}
    </Menu>
  </>
);

export default Dropdown;
