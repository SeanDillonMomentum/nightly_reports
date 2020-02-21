import { gql } from "apollo-boost";

const ALL_INSTALL_MANAGERS = gql`
  query allInstallManagers {
    allInstallManagers {
      im_id
      name
      all_market {
        market_id
        name
      }
    }
  }
`;

export default ALL_INSTALL_MANAGERS;
