import React from "react";
import { useQuery } from "@apollo/react-hooks";
import SA_REPORTS_BY_ID from "../../graphql/queries/saReportsById";
import Table from "../../components/TableNew/Table";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import { StyledSubmit } from "./styles";

const tableHeaders = [
  { id: "1", label: "Customer Name", key: "customerName" },
  { id: "2", label: "Address", key: "customerAddress" },
  { id: "3", label: "Opportunity Number", key: "opportunityNumber" },
  { id: "4", label: "Project Number", key: "projectNumber" },
  { id: "5", label: "Job Type", key: "jobType" },
  { id: "6", label: "Submittal Date", key: "date", type: "date" },
  { id: "7", label: "Site Assessor", key: "siteAssessor" },
  { id: "8", label: "S/P", key: "sp", type: "date" },
  { id: "9", label: "O/S", key: "os", type: "date" },
  { id: "10", label: "Winter Solstice", key: "winterSolstice", type: "bool" },
  { id: "11", label: "Total Interior ⏰", key: "totalInterior" },
  {
    id: "12",
    label: "Total Exterior ⏰",
    key: "totalExterior"
  },
  { id: "13", label: "SA Complete", key: "saComplete", type: "bool" },
  { id: "14", label: "Number Of Arrays", key: "numberOfArrays" },
  { id: "15", label: "Roof Type", key: "roofType" },
  {
    id: "16",
    label: "Forty Foot Ladder",
    key: "fortyFootLadder",
    type: "bool"
  },
  { id: "17", label: "Second Assessor", key: "ifSecondAssessor" },
  { id: "18", label: "Notes", key: "notes" },
  { id: "19", label: "Submitted By", key: "nightly_report_user" },
  { id: "20", label: "Escalation", key: "escalation" }
];

const SAReportTable = ({ id }) => {
  const { loading, error, data } = useQuery(SA_REPORTS_BY_ID, {
    variables: { id }
  });
  if (loading) return <OtherLoader />;
  if (error) return <div>Error</div>;
  let newerData = data.saReportsById.reduce((arr, curr) => {
    arr.push({
      ...curr,
      nightly_report_user: curr["nightly_report_user"].user
    });
    return arr;
  }, []);
  // console.log(newerData);
  return (
    <StyledSubmit style={{ overflow: "scroll" }}>
      <Table
        localStorageVal="userSaTable"
        initialSearch="customerName"
        data={newerData}
        tableHeaders={tableHeaders}
      />
    </StyledSubmit>
  );
};

export default SAReportTable;
