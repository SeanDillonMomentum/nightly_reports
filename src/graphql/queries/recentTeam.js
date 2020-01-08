import { gql } from "apollo-boost";

const RECENT_TEAM = gql`
  query recentTeam($id: ID) {
    recentTeam(id: $id) {
      id
      name
      team_members {
        id
        crew_member_type {
          type
          id
        }
        crew_member {
          name
          id
        }
      }
    }
  }
`;

export default RECENT_TEAM;
