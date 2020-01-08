import { gql } from "apollo-boost";

const NIGHTLY_IM_REPORTS = gql`
  query nightlyImReport {
    nightlyImReport {
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

export default NIGHTLY_IM_REPORTS;
