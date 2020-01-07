import { gql } from "apollo-boost";

const CREATE_IM_REPORT = gql`
  mutation createImReport(
    $report: ImReportInput
    $crewMembers: [CrewMemberInput]!
  ) {
    createImReport(report: $report, crewMembers: $crewMembers) {
      id
      submittedBy
    }
  }
`;

export default CREATE_IM_REPORT;
