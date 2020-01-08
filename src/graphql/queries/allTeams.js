import { gql } from "apollo-boost";

const ALL_TEAMS = gql`
  query teams {
    teams {
      id
      name
      team_members {
        crewMember
        crewMemberType
        crew_member {
          name
          id
        }
        crew_member_type {
          id
          type
        }
      }
    }
  }
`;

export default ALL_TEAMS;
