import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { SelectIconContainer } from "./styles";

const SelectIcon = ({
  open,
  handleMenu,
  icon,
  anchorEl,
  handleClose,
  items,
  marginRight,
  allIcon
}) => (
  <SelectIconContainer marginRight={marginRight}>
    <IconButton
      className="menuIcon"
      aria-owns={open ? "menu-appbar" : undefined}
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
    >
      <Icon className="menuIconSizing">{icon}</Icon>
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={open}
      onClose={handleClose}
    >
      {allIcon ? (
        <MenuItem onClick={() => handleClose()} value={null}>
          All
        </MenuItem>
      ) : null}
      {items.map(item => {
        return (
          <MenuItem
            onClick={() => handleClose(item)}
            key={item.id}
            value={item.id}
          >
            {item.name}
          </MenuItem>
        );
      })}
    </Menu>
  </SelectIconContainer>
);

export default SelectIcon;
