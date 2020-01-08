import { gql } from "apollo-boost";

const FIND_USER = gql`
  query findUser($id: ID, $user: String) {
    findUser(id: $id, user: $user) {
      id
      recentTeam
      nightly_report_tables {
        id
        table_type
      }
      nightly_im_reports {
        id
        faOnSite
        notes
      }
      teams {
        id
        name
        team_members {
          id
          team_id
          crew_member {
            name
            id
          }
          crew_member_type {
            type
            id
          }
        }
      }
      user
    }
  }
`;

export default FIND_USER;
