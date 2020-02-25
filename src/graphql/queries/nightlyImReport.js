import { gql } from "apollo-boost";

const NIGHTLY_IM_REPORTS = gql`
  query nightlyImReport {
    nightlyImReport {
      id
      jobType
      sp
      os
      roundTripTotalHours
      correctPic
      onsiteRevision
      salesRepVisit
      salesRep
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

export default NIGHTLY_IM_REPORTS;
