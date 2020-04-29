import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import OtherLoader from "./components/OtherLoader/OtherLoader";
import styled from "styled-components";
import SideNav from "./components/SideNav/SideNav";
import { Context } from "./routers/AppRouter";

import FIND_USER from "./graphql/queries/findUser";

const StyledApp = styled.div`
  margin: 15px;
  margin-left: ${(props) => (props.show ? "150px" : "60px")};
  transition: margin-left 0.5s;
`;

const Wrapper = ({ component, accountInfo, ...props }) => {
  const { show } = useContext(Context);

  const Component = component;
  const { loading, error, data } = useQuery(FIND_USER, {
    variables: { user: accountInfo.account.userName.toLowerCase() },
  });
  if (loading) return <OtherLoader />;
  if (error) return <div>An Error Occurred Please Try Again Later!</div>;

  return (
    <>
      {/* <Header accountInfo={accountInfo} /> */}
      <SideNav permissions={data.findUser} />
      <StyledApp show={show}>
        {!data.findUser ? (
          <div>No Current Roles</div>
        ) : (
          <Component
            {...props}
            permissions={data.findUser}
            accountInfo={accountInfo}
          />
        )}
      </StyledApp>
    </>
  );
};

export default Wrapper;
