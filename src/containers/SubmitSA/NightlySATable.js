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
  { id: "4", label: "Job Type", key: "jobType" },
  { id: "5", label: "Submittal Date", key: "date", type: "date" },
  { id: "6", label: "Site Assessor", key: "siteAssessor" },
  { id: "7", label: "S/P", key: "sp", type: "date" },
  { id: "8", label: "O/S", key: "os", type: "date" },
  { id: "9", label: "Winter Solstice", key: "winterSolstice", type: "bool" },
  { id: "10", label: "Total Interior", key: "totalInterior" },
  {
    id: "11",
    label: "Total Exterior",
    key: "totalExterior"
  },
  { id: "12", label: "SA Complete", key: "saComplete", type: "bool" },
  { id: "13", label: "Notes", key: "notes" },
  { id: "14", label: "Submitted By", key: "nightly_report_user" }
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
  return (
    <StyledSubmit style={{ overflow: "scroll" }}>
      <Table
        initialSearch="customerName"
        data={newerData}
        tableHeaders={tableHeaders}
      />
    </StyledSubmit>
  );
};

export default SAReportTable;
