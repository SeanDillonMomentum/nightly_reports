import React from "react";
import Tabs from "../../components/Tabs/Tabs";
import SaReports from "./SaReports";
import ImReports from "./ImReports";

const AdminView = () => {
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
