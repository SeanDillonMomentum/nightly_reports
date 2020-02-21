import { gql } from "apollo-boost";

const INSTALL_CREWS_BY_MARKET = gql`
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
`;

export default INSTALL_CREWS_BY_MARKET;
