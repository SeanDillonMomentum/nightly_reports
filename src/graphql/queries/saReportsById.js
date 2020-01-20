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
      winterSolstice
      totalInterior
      totalExterior
      saComplete
      fortyFootLadder
      ifSecondAssessor
      roofAssessment
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
