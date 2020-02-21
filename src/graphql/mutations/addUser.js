import { gql } from "apollo-boost";

const ADD_USER = gql`
  mutation addUser($user: String!, $tables: [TableInput], $market: Int!) {
    addUser(user: $user, tables: $tables, market: $market) {
      id
      user
    }
  }
`;

export default ADD_USER;
