import { gql } from "apollo-boost";

const CREATE_SA_REPORT = gql`
  mutation createSaReport($report: SaReportInput) {
    createSaReport(report: $report) {
      id
      submittedBy
    }
  }
`;

export default CREATE_SA_REPORT;
