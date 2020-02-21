import { gql } from "apollo-boost";

const CHANGE_CREW_TEAM = gql`
  mutation changeCrewTeam(
    $coad_id: String!
    $crew_team_id: Int!
    $crew_id: Int!
  ) {
    changeCrewTeam(
      coad_id: $coad_id
      crew_team_id: $crew_team_id
      crew_id: $crew_id
    ) {
      crew_team_id
    }
  }
`;

export default CHANGE_CREW_TEAM;
