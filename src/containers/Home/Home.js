import React, { useEffect, useState } from "react";
import { Card } from "./styles";
import { Assignment } from "@material-ui/icons";
import NightlyReport from "./NightlyReport";

const accounts = [
  "sdillon@momentumsolar.com",
  "adimaria@momentumsolar.com",
  "rslattery@momentumsolar.com"
];
const Home = ({ accountInfo }) => {
  console.log(accountInfo);
  return (
    <Card>
      <h1>
        <Assignment style={{ marginRight: "5px" }} />
        Nightly Report
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NightlyReport />
      </div>
    </Card>
  );
};

export default Home;
