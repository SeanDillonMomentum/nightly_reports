import { gql } from "apollo-boost";

const EDIT_USER = gql`
  mutation editUser(
    $_id: Int!
    $user: String!
    $market: Int!
    $tables: [Int!]!
  ) {
    editUser(_id: $_id, user: $user, market: $market, tables: $tables) {
      id
    }
  }
`;

export default EDIT_USER;
