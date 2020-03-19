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

      siteAssessor
      sp
      os
      market
      totalInterior
      totalExterior
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
