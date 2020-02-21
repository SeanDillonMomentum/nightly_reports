import { gql } from "apollo-boost";

const ALL_USERS = gql`
  query allUsers {
    allUsers {
      id
      user
      all_market {
        market_id
        name
      }
      nightly_report_tables {
        id
        table_type
      }
    }
    allMarkets {
      market_id
      name
    }
    allTables {
      id
      table_type
    }
  }
`;

export default ALL_USERS;
