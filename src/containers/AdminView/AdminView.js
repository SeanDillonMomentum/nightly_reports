import React, { useEffect } from "react";
import Tabs from "../../components/Tabs/Tabs";
import SaReports from "./SaReports";
import ImReports from "./ImReports";

const AdminView = ({ location, history }) => {
  useEffect(() => {
    if (
      !location.state ||
      !location.state.userData.nightly_report_tables.find(x => x.id === "5")
    )
      history.push("/");
  }, [location, history]);
  return (
    <Tabs>
      <div label="SA REPORTS">
        <SaReports />
      </div>
      <div label="IM REPORTS">
        <ImReports />
      </div>
    </Tabs>
  );
};

export default AdminView;
