import { gql } from "apollo-boost";

const FIND_USER = gql`
  query findUser($id: ID, $user: String) {
    findUser(id: $id, user: $user) {
      id
      all_market {
        market_id
        name
      }
      nightly_report_tables {
        id
        table_type
      }
      nightly_im_reports {
        id
        faOnSite
        notes
      }
      user
    }
  }
`;

export default FIND_USER;
