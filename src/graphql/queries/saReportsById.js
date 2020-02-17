import { gql } from "apollo-boost";

const SA_REPORTS_BY_ID = gql`
  query saReportsById($id: ID!) {
    saReportsById(id: $id) {
      id
      customerName
      customerAddress
      opportunityNumber
      projectNumber
      jobType
      date
      siteAssessor
      sp
      os
      market
      totalInterior
      totalExterior
      fortyFootLadder
      ifSecondAssessor
      escalation
      numberOfArrays
      roofType
      notes
      submittedBy
      nightly_report_user {
        user
      }
    }
  }
`;

export default SA_REPORTS_BY_ID;
