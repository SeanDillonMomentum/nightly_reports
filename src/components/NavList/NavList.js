import React from "react";
import { NavLink } from "react-router-dom";
//styles
import { Nav } from "./styles";

const NavList = ({ expand, link, dropdown, children, ourClass }) => {
  return (
    <Nav
      onClick={expand}
      active={window.location.pathname === link && "rgba(0, 0, 0, 0.12)"}
    >
      {link ? (
        <NavLink
          exact
          to={link}
          activeClassName={
            !dropdown ? "dashboardTextActive" : "dashboardTextReviewActive"
          }
          className={!dropdown ? "dashboardText" : "dashboardTextReview"}
        >
          {children}
        </NavLink>
      ) : (
        <div className={ourClass ? "dashboardTextActive" : "dashboardText"}>
          {children}
        </div>
      )}
    </Nav>
  );
};

export default NavList;
