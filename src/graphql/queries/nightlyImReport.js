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
      install_crew {
        insCrewId
        name
      }
      crew_member_reports {
        crew_member_type {
          crew_memb_type_id
          type
        }
        FLDINST_USER {
          EMAIL
          COAD_ID
        }
      }
    }
  }
`;

export default NIGHTLY_IM_REPORTS;
