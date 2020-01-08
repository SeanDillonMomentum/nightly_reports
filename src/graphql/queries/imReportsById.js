import { gql } from "apollo-boost";

const IM_REPORTS_BY_ID = gql`
  query imReportsById($id: ID!) {
    imReportsById(id: $id) {
      id
      customerName
      customerAddress
      jobType
      date
      sp
      os
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
      crew_member_reports {
        id
        report
        crewMember
        crewMemberType
        crew_member {
          name
        }
        crew_member_type {
          type
        }
      }
    }
  }
`;

export default IM_REPORTS_BY_ID;
