import { gql } from "apollo-boost";

const ALL_USERS = gql`
  query allUsers {
    allUsers {
      id
      user
      nightly_report_tables {
        id
        table_type
      }
      nightly_im_reports {
        id
        submittedBy
        faOnSite
        notes
      }
      nightly_sa_reports {
        id
      }
    }
  }
`;

export default ALL_USERS;
