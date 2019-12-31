import { gql } from "apollo-boost";

const IM_REPORTS_BY_ID = gql`
  query imReportsById($id: ID!) {
    imReportsById(id: $id) {
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

export default IM_REPORTS_BY_ID;
