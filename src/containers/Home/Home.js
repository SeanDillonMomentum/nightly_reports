import React, { useEffect, useState } from "react";
import { Card } from "./styles";
import { Assignment } from "@material-ui/icons";
import { useQuery } from "@apollo/react-hooks";
import ALL_USERS from "../../graphql/queries/allUsers";
// import NightlyReport from "./NightlyReport";

const accounts = [
  "sdillon@momentumsolar.com",
  "adimaria@momentumsolar.com",
  "rslattery@momentumsolar.com"
];
const Home = ({ accountInfo }) => {
  return (
    <Card>
      <h1>
        <Assignment style={{ marginRight: "5px" }} />
        Nightly Report
      </h1>
      <div>Hey</div>
    </Card>
  );
};

export default Home;
