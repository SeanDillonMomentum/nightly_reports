import { gql } from "apollo-boost";

const CREATE_TABLE = gql`
  mutation createTable($table_type: String!) {
    addTable(table_type: $table_type) {
      id
      table_type
    }
  }
`;

export default CREATE_TABLE;
