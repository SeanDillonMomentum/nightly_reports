import React from "react";
import { Card } from "./styles";
import { useQuery } from "@apollo/react-hooks";
import FIND_USER from "../../graphql/queries/findUser";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import styled from "styled-components";
// import NightlyReport from "./NightlyReport";

const StyledHome = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Home = ({ accountInfo, history }) => {
  const { loading, error, data } = useQuery(FIND_USER, {
    variables: { user: accountInfo.account.userName.toLowerCase() }
  });
  if (loading) return <OtherLoader />;
  if (error) return <div>Error</div>;
  return (
    <StyledHome>
      {!data.findUser || !data.findUser.nightly_report_tables.length ? (
        <h1>No Current Permissioned Tables</h1>
      ) : (
        <>
          {data.findUser.nightly_report_tables.find(
            x => x.table_type === "sareport"
          ) && (
            <Card
              onClick={() =>
                history.push("/submitsa", { userData: data.findUser })
              }
            >
              <h1>SA REPORT</h1>
            </Card>
          )}
          {data.findUser.nightly_report_tables.find(
            x => x.table_type === "imreport"
          ) && (
            <Card
              onClick={() =>
                history.push("/submitim", { userData: data.findUser })
              }
            >
              <h1>IM REPORT</h1>
            </Card>
          )}
          {data.findUser.nightly_report_tables.find(
            x => x.table_type === "auth"
          ) && (
            <>
              <Card
                onClick={() =>
                  history.push("/auth", { userData: data.findUser })
                }
              >
                <h1>AUTH</h1>
              </Card>
              <Card
                onClick={() =>
                  history.push("/adminview", { userData: data.findUser })
                }
              >
                <h1>ADMIN VIEW</h1>
              </Card>
            </>
          )}
        </>
      )}
    </StyledHome>
  );
};

export default Home;
