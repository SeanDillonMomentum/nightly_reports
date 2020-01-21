import { gql } from "apollo-boost";

const NIGHTLY_SA_REPORTS = gql`
  query nightlySaReport {
    nightlySaReport {
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
      notes
      submittedBy
      fortyFootLadder
      ifSecondAssessor
      escalation
      numberOfArrays
      roofType
      nightly_report_user {
        user
      }
    }
  }
`;

export default NIGHTLY_SA_REPORTS;
