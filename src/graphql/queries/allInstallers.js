import { gql } from "apollo-boost";

const ALL_INSTALLERS = gql`
  query allInstallers($market_id: Int!) {
    allInstallers {
      COAD_ID
      LOCATION
      FULL_NAME
      EMAIL
    }
    allMarkets {
      market_id
      name
    }
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
      all_market {
        name
      }
    }
  }
`;

export default ALL_INSTALLERS;
