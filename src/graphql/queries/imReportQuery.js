import { gql } from "apollo-boost";

const IM_REPORT_QUERY = gql`
  query imReportQuery($market_id: Int!, $id: ID!, $office: String!) {
    allInstallCrewsByMarket(market_id: $market_id) {
      name
      insCrewId
      crew_team_members {
        startTime
        endTime
        crew_team_id
        coad_id
        FLDINST_USER {
          FULL_NAME
        }
      }
    }
    crewMemberTypes {
      crew_memb_type_id
      type
    }
    allMarkets {
      market_id
      name
    }

    allSalesRepsByMarket(office: $office) {
      OFFICE
      HR_NAME
    }

    imReportsById(id: $id) {
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

export default IM_REPORT_QUERY;
