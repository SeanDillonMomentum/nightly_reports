import { gql } from "apollo-boost";

const IM_REPORTS_BY_ID = gql`
  query imReportsById($id: ID!) {
    imReportsById(id: $id) {
      id
      jobType
      sp
      os
      roundTripTotalHours
      correctPic
      onsiteRevision
      salesRepVisit
      saleRep
      faOnSite
      fieldAssurance
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
