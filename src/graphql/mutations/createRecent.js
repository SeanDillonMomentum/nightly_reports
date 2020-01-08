import { gql } from "apollo-boost";

const CREATE_RECENT = gql`
  mutation createRecent($recentTeam: recentTeamInput) {
    createRecent(recentTeam: $recentTeam) {
      id
      nightly_report_user {
        id
        user
      }
      crew_member {
        name
      }
    }
  }
`;

export default CREATE_RECENT;
