import { gql } from "apollo-boost";

const SA_REPORTS_BY_ID = gql`
  query saReportsById($id: ID!) {
    saReportsById(id: $id) {
      id
      customerName
      customerAddress
      opportunityNumber
      jobType
      date
      siteAssessor
      sp
      os
      winterSolstice
      totalInterior
      totalExterior
      saComplete
      notes
      submittedBy
      nightly_report_user {
        user
      }
    }
  }
`;

export default SA_REPORTS_BY_ID;
