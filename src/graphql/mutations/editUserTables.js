import { gql } from "apollo-boost";

const EDIT_USER_TABLES = gql`
  mutation editUserTables($user: ID!, $tables: [TableInput]) {
    editUserTables(user: $user, tables: $tables) {
      id
      table
      user
    }
  }
`;

export default EDIT_USER_TABLES;
