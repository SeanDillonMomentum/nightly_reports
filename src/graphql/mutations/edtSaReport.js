import { gql } from "apollo-boost";

const EDIT_SA_REPORT = gql`
  mutation editSaReport($report: SaReportInput!, $id: Int!) {
    editSaReport(report: $report, id: $id)
  }
`;

export default EDIT_SA_REPORT;
