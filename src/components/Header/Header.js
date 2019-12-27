import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { SubdirectoryArrowLeft } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { authProvider } from "../../Auth/authConfig";
import logoFromHeader from "../../assets/SEANPNG.png";
import { StyledHeader } from "./styles";
import { Context } from "../../routers/AppRouter";

const Header = ({ accountInfo, logout }) => {
  const { show, setShow } = useContext(Context);
  const { name } = accountInfo.account;
  return (
    <StyledHeader show={show ? "0deg" : "180deg"}>
      <AppBar className="navbar">
        <Toolbar className="toolbarLeft">
          <IconButton
            className="menuButton"
            aria-label="Menu"
            onClick={() => setShow(!show)}
          >
            <MenuIcon />
          </IconButton>
          <img
            className="imgHeader"
            src={logoFromHeader}
            alt="our-guest-logo"
          />
        </Toolbar>
        <Toolbar className="toolbar">
          <span className="grow">IM Reports</span>
          <SubdirectoryArrowLeft
            style={{ color: "black", fontSize: "24px", marginRight: "5px" }}
            onClick={() => authProvider.logout()}
          />
          <p style={{ marginRight: "30px" }}>{name}</p>
        </Toolbar>
      </AppBar>
    </StyledHeader>
  );
};
export default Header;
