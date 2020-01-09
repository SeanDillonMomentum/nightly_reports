import React, { useContext, useEffect } from "react";
import { Context } from "../../routers/AppRouter";
import { Card } from "./styles";
import { useQuery } from "@apollo/react-hooks";
import FIND_USER from "../../graphql/queries/findUser";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import styled from "styled-components";

const StyledHome = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Home = ({ accountInfo, history }) => {
  const { setWasHome, wasHome } = useContext(Context);
  const { loading, error, data } = useQuery(FIND_USER, {
    variables: { user: accountInfo.account.userName.toLowerCase() }
  });
  useEffect(() => {
    if (!wasHome && data && data.findUser) {
      setWasHome(true);
    }
  }, [setWasHome, data, wasHome]);

  if (loading) return <OtherLoader />;
  if (error) return <div>Error</div>;

  const cardCheck = authType =>
    data.findUser.nightly_report_tables.find(x => x.table_type === authType);
  return (
    <StyledHome>
      {!data.findUser || !data.findUser.nightly_report_tables.length ? (
        <h1>No Current Permissioned Tables</h1>
      ) : (
        <>
          {cardCheck("sareport") && (
            <Card onClick={() => history.push("/submitsa")}>
              <h1>SA REPORT</h1>
            </Card>
          )}
          {cardCheck("imreport") && (
            <>
              <Card onClick={() => history.push("/submitim")}>
                <h1>IM REPORT</h1>
              </Card>
              <Card onClick={() => history.push("/editteams")}>
                <h1>EDIT TEAMS</h1>
              </Card>
            </>
          )}
          {cardCheck("auth") && (
            <>
              <Card onClick={() => history.push("/auth")}>
                <h1>AUTH</h1>
              </Card>
              <Card onClick={() => history.push("/adminview")}>
                <h1>ADMIN VIEW</h1>
              </Card>
              <Card onClick={() => history.push("/editcrew")}>
                <h1>EDIT CREW/CREW TYPES</h1>
              </Card>
            </>
          )}
        </>
      )}
    </StyledHome>
  );
};

export default Home;
