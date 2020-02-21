import { gql } from "apollo-boost";

const IM_REPORT_QUERY = gql`
  query imReportQuery($market_id: Int!, $id: ID!) {
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

export default IM_REPORT_QUERY;
