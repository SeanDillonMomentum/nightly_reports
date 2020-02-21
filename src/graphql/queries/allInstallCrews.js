import { gql } from "apollo-boost";

const ALL_INSTALL_CREWS = gql`
  query allInstallCrews {
    allInstallCrews {
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

export default ALL_INSTALL_CREWS;
