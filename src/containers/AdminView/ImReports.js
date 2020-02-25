import React from "react";
import { useQuery } from "@apollo/react-hooks";
import NIGHTLY_IM_REPORTS from "../../graphql/queries/nightlyImReport";
import Table from "../../components/TableNew/Table";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import { StyledSubmit } from "../../utils/styledComps/styledComps";

const tableHeaders = [
  { id: "1", label: "Job Type", key: "jobType" },
  { id: "2", label: "S/P", key: "sp", type: "date" },
  { id: "3", label: "O/S", key: "os", type: "date" },
  { id: "4", label: "Round Trip Total Hours", key: "roundTripTotalHours" },
  { id: "5", label: "Correct Pic", key: "correctPic", type: "bool" },
  { id: "6", label: "Onsite Revision", key: "onsiteRevision", type: "bool" },
  { id: "7", label: "Sales Rep Visit", key: "salesRepVisit", type: "bool" },
  { id: "8", label: "FA On Site", key: "faOnSite", type: "bool" },
  {
    id: "9",
    label: "Construction Complete",
    key: "constructionComplete",
    type: "bool"
  },
  { id: "10", label: "DC Size", key: "dcSize" },
  { id: "11", label: "Panels Installed", key: "panelsInstalled", type: "bool" },
  { id: "12", label: "Notes", key: "notes" },
  { id: "13", label: "Market", key: "market" },
  { id: "14", label: "Sales Rep On Site", key: "salesRep" },
  { id: "15", label: "Field Assurance On Site", key: "fieldAssurance" },
  { id: "16", label: "Install Crew", key: "install_crew" },
  {
    id: "17",
    label: "Submitted By",
    key: "nightly_report_user",
    secondKey: "user"
  },
  {
    id: "18",
    label: "Crew Members",
    key: "crewMembers"
  }
];

const ImReports = () => {
  const { loading, error, data } = useQuery(NIGHTLY_IM_REPORTS);

  if (loading) return <OtherLoader />;
  if (error) return <div>Error</div>;
  let newerData = data.nightlyImReport.reduce((arr, curr) => {
    arr.push({
      ...curr,
      nightly_report_user: curr["nightly_report_user"].user,
      crewMembers: curr.crew_member_reports.map(
        curr => `${curr.FLDINST_USER.FULL_NAME} : ${curr.crew_member_type.type}`
      ),
      market: curr.all_market.name,
      install_crew: curr.install_crew.name
    });
    return arr;
  }, []);
  return (
    <StyledSubmit style={{ overflow: "scroll" }}>
      <Table
        localStorageVal="adminImTable"
        initialSearch="jobType"
        data={newerData}
        tableHeaders={tableHeaders}
      />
    </StyledSubmit>
  );
};

export default ImReports;
