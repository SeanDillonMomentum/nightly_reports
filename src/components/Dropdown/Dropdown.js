import React from "react";
//styles
import styled from "styled-components";
//components
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "../Button/Button";

const StyledButton = styled(Button)`
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
  items,
  rowValue,
  width,
  marginRight
}) => (
  <>
    <StyledButton
      marginRight={marginRight}
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
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={open}
      onClose={handleClose}
    >
      {items.map(item => {
        return (
          <MenuItem
            onClick={() => handleClose(item)}
            key={item.id ? item.id : item}
            value={item.id}
          >
            {item.name ? item.name : item}
          </MenuItem>
        );
      })}
    </Menu>
  </>
);

export default Dropdown;
