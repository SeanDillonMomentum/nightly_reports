import React from "react";
import { useQuery } from "@apollo/react-hooks";
import NIGHTLY_SA_REPORTS from "../../graphql/queries/nightlySaReport";
import Table from "../../components/TableNew/Table";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import { StyledSubmit } from "../../utils/styledComps/styledComps";

const tableHeaders = [
  { id: "1", label: "Customer Name", key: "customerName" },
  { id: "2", label: "Address", key: "customerAddress" },
  { id: "3", label: "Opportunity Number", key: "opportunityNumber" },
  { id: "4", label: "Project Number", key: "projectNumber" },
  { id: "5", label: "Job Type", key: "jobType" },
  { id: "6", label: "Site Assessor", key: "siteAssessor" },
  { id: "7", label: "S/P", key: "sp", type: "date" },
  { id: "8", label: "O/S", key: "os", type: "date" },
  { id: "9", label: "Total Interior ⏰", key: "totalInterior" },
  {
    id: "10",
    label: "Total Exterior ⏰",
    key: "totalExterior"
  },
  { id: "11", label: "Number Of Arrays", key: "numberOfArrays" },
  { id: "12", label: "Roof Type", key: "roofType" },
  {
    id: "13",
    label: "Forty Foot Ladder",
    key: "fortyFootLadder",
    type: "bool"
  },
  { id: "14", label: "Second Assessor", key: "ifSecondAssessor" },
  { id: "15", label: "Notes", key: "notes" },
  { id: "16", label: "Submitted By", key: "nightly_report_user" },
  { id: "17", label: "Market", key: "market" },
  { id: "18", label: "Escalation", key: "escalation" }
];

const SaReports = () => {
  const { loading, error, data } = useQuery(NIGHTLY_SA_REPORTS);

  if (loading) return <OtherLoader />;
  if (error) return <div>Error</div>;
  let newerData = data.nightlySaReport.reduce((arr, curr) => {
    arr.push({
      ...curr,
      nightly_report_user: curr["nightly_report_user"].user
    });
    return arr;
  }, []);
  return (
    <StyledSubmit style={{ overflow: "scroll" }}>
      <Table
        initialSort="customerName"
        localStorageVal="adminSaTable"
        initialSearch="customerName"
        data={newerData}
        tableHeaders={tableHeaders}
      />
    </StyledSubmit>
  );
};

export default SaReports;
