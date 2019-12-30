import { gql } from "apollo-boost";

const CREATE_IM_REPORT = gql`
  mutation createImReport($report: ImReportInput) {
    createImReport(report: $report) {
      id
      submittedBy
    }
  }
`;

export default CREATE_IM_REPORT;
