import { gql } from "apollo-boost";

const CREATE_INSTALL_MANAGER = gql`
  mutation createInstallManager(
    $name: String!
    $email: String!
    $market: Int!
  ) {
    createInstallManager(name: $name, email: $email, market: $market) {
      im_id
      name
      email
    }
  }
`;

export default CREATE_INSTALL_MANAGER;
