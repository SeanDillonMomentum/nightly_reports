import React, { useContext } from "react";
//styles
import StyledSidebar from "./styles";
//adminlevel
import { Context } from "../../routers/AppRouter";
import NavList from "../NavList/NavList";
import { Home } from "@material-ui/icons";

const SideNav = () => {
  const { show } = useContext(Context);
  return (
    <>
      <StyledSidebar open={show}>
        <ul>
          <NavList link="/">
            <Home />
          </NavList>
        </ul>
      </StyledSidebar>
    </>
  );
};

export default SideNav;
