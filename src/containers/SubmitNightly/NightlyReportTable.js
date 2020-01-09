import React from "react";
import { useQuery } from "@apollo/react-hooks";
import IM_REPORTS_BY_ID from "../../graphql/queries/imReportsById";
import Table from "../../components/TableNew/Table";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import { StyledSubmit } from "./styles";

const tableHeaders = [
  { id: "1", label: "Customer Name", key: "customerName" },
  { id: "2", label: "Address", key: "customerAddress" },
  { id: "3", label: "Job Type", key: "jobType" },
  { id: "4", label: "Date", key: "date", type: "date" },
  { id: "5", label: "S/P", key: "sp", type: "date" },
  { id: "6", label: "O/S", key: "os", type: "date" },
  { id: "7", label: "Electrical Total Hours", key: "electricalTotalHours" },
  {
    id: "8",
    label: "Installation Total Hours",
    key: "installationTotalHours"
  },
  { id: "9", label: "Round Trip Total Hours", key: "roundTripTotalHours" },
  { id: "10", label: "Correct Pic", key: "correctPic", type: "bool" },
  { id: "11", label: "Onsite Revision", key: "onsiteRevision", type: "bool" },
  { id: "12", label: "Sales Rep Visit", key: "salesRepVisit", type: "bool" },
  { id: "13", label: "FA On Site", key: "faOnSite", type: "bool" },

  {
    id: "14",
    label: "Construction Complete",
    key: "constructionComplete",
    type: "bool"
  },
  { id: "15", label: "Panel Type", key: "panelType" },
  { id: "16", label: "Panel Count", key: "panelCount" },
  { id: "17", label: "DC Size", key: "dcSize" },
  { id: "18", label: "Panels Installed", key: "panelsInstalled", type: "bool" },
  { id: "19", label: "Notes", key: "notes" },
  { id: "20", label: "Office", key: "office" },
  {
    id: "21",
    label: "Submitted By",
    key: "nightly_report_user",
    secondKey: "user"
  },
  {
    id: "22",
    label: "Crew Members",
    key: "crewMembers"
  }
];

const NightlyReportTable = ({ id }) => {
  const { loading, error, data } = useQuery(IM_REPORTS_BY_ID, {
    variables: { id }
  });
  if (loading) return <OtherLoader />;
  if (error) return <div>Error</div>;
  let newerData = data.imReportsById.reduce((arr, curr) => {
    arr.push({
      ...curr,
      nightly_report_user: curr["nightly_report_user"].user,
      crewMembers: curr.crew_member_reports.map(
        curr => `${curr.crew_member.name} : ${curr.crew_member_type.type}`
      )
    });
    return arr;
  }, []);
  return (
    <StyledSubmit style={{ overflow: "scroll" }}>
      <Table
        localStorageVal="userImTable"
        initialSearch="customerName"
        data={newerData}
        tableHeaders={tableHeaders}
      />
    </StyledSubmit>
  );
};

export default NightlyReportTable;
