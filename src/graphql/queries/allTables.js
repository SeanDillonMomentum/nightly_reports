import { gql } from "apollo-boost";

const ALL_TABLES = gql`
  query allTables {
    allTables {
      id
      table_type
    }
  }
`;

export default ALL_TABLES;
