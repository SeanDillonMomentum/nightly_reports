import React, { useContext } from "react";
//styles
import StyledSidebar, { StyledMenu } from "./styles";
//adminlevel
import { Context } from "../../routers/AppRouter";
import NavList from "../NavList/NavList";
import { Home, BarChart, Lock } from "@material-ui/icons";

const SideNav = ({ permissions }) => {
  const { show, setShow } = useContext(Context);
  const cardCheck = authType =>
    permissions.nightly_report_tables.find(x => x.table_type === authType);

  return (
    <>
      <StyledMenu rotation={show ? 1 : 0} onClick={() => setShow(!show)} />
      <StyledSidebar open={show}>
        {show && (
          <ul>
            <NavList link="/">
              <Home />
              Home
            </NavList>
            {cardCheck("sareport") && (
              <NavList link="/submitsa">
                <BarChart />
                Submit SA
              </NavList>
            )}
            {cardCheck("imreport") && (
              <>
                <NavList link="/submitim">
                  <BarChart />
                  Submit IM
                </NavList>
                <NavList link="/editteams">
                  <BarChart />
                  Edit Teams
                </NavList>
              </>
            )}
            {cardCheck("auth") && (
              <>
                <NavList link="/auth">
                  <Lock />
                  Auth
                </NavList>
                <NavList link="/adminview">
                  <Lock />
                  Admin View
                </NavList>
                <NavList link="/editcrew">
                  <BarChart />
                  Edit Crews
                </NavList>
              </>
            )}
          </ul>
        )}
      </StyledSidebar>
    </>
  );
};

export default SideNav;
