import { gql } from "apollo-boost";

const NIGHTLY_IM_REPORTS = gql`
  query nightlyImReport {
    nightlyImReport {
      id
      customerName
      customerAddress
      jobType
      date
      foreman
      crewDesignator
      sp
      os
      crewCount
      electricalTotalHours
      installationTotalHours
      roundTripTotalHours
      correctPic
      onsiteRevision
      salesRepVisit
      faOnSite
      panelType
      panelCount
      dcSize
      panelsInstalled
      constructionComplete
      notes
      office
      submittedBy
      nightly_report_user {
        user
      }
    }
  }
`;

export default NIGHTLY_IM_REPORTS;