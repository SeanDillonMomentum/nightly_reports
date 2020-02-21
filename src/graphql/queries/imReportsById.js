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
      nightly_report_user {
        user
      }
      all_market {
        market_id
        name
      }
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
          FULL_NAME
        }
      }
    }
  }
`;

export default IM_REPORTS_BY_ID;
