import { gql } from "apollo-boost";

const ADD_TABLE = gql`
  mutation addTable($table_type: String) {
    addTable(table_type: $table_type) {
      id
      table_type
    }
  }
`;

export default ADD_TABLE;
