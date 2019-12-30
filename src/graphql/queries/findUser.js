import { gql } from "apollo-boost";

const FIND_USER = gql`
  query findUser($id: ID!) {
    findUser(id: $id) {
      id
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
