import { gql } from "apollo-boost";

const TEAMS_BY_USER = gql`
  query teamsByUser($user: Int!) {
    teamsByUser(user: $user) {
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

export default TEAMS_BY_USER;
