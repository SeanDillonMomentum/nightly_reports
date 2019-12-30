import React, { useContext } from "react";
//styles
import StyledSidebar from "./styles";
//adminlevel
import { Context } from "../../routers/AppRouter";
import NavList from "../NavList/NavList";
import { Home, Assignment, BarChart } from "@material-ui/icons";

const SideNav = ({ accountInfo }) => {
  const { show } = useContext(Context);
  return (
    <>
      <StyledSidebar open={show}>
        <ul>
          <NavList link="/">
            <Home />
          </NavList>
          <NavList link="/viewdata">
            <Assignment />
          </NavList>
          <NavList link="/aggregation">
            <BarChart />
          </NavList>
        </ul>
      </StyledSidebar>
    </>
  );
};

export default SideNav;
