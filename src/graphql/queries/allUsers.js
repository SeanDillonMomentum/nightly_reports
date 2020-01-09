import { gql } from "apollo-boost";

const ALL_USERS = gql`
  query allUsers {
    allUsers {
      id
      user
      defaultState
      nightly_report_tables {
        id
        table_type
      }
    }
  }
`;

export default ALL_USERS;
