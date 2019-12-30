import { gql } from "apollo-boost";

const ADD_USER = gql`
  mutation addUser($user: String!, $tables: [TableInput]) {
    addUser(user: $user, tables: $tables) {
      id
      user
    }
  }
`;

export default ADD_USER;
