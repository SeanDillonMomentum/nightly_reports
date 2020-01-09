import { gql } from "apollo-boost";

const ADD_USER = gql`
  mutation addUser(
    $user: String!
    $tables: [TableInput]
    $defaultState: String
  ) {
    addUser(user: $user, tables: $tables, defaultState: $defaultState) {
      id
      user
    }
  }
`;

export default ADD_USER;
