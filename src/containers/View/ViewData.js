import React from "react";
import Tabs from "../../components/Tabs/Tabs";
import Table from "../../components/Table/Table";
import dataSet from "./testObj.json";
import { headers, relatedData, offices } from "../../utils/dataHelpers";

const ViewData = () => {
  return (
    <div style={{ margin: "30px" }}>
      <Tabs>
        {offices.map(office => (
          <div label={office} key={office}>
            <Table
              relatedData={relatedData}
              headers={headers}
              data={dataSet.filter(row => row.office === office)}
            />
          </div>
        ))}
      </Tabs>
    </div>
  );
};

export default ViewData;
