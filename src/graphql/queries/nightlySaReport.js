import { gql } from "apollo-boost";

const NIGHTLY_SA_REPORTS = gql`
  query nightlySaReport {
    nightlySaReport {
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

export default NIGHTLY_SA_REPORTS;