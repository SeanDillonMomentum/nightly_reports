import { gql } from "apollo-boost";

const INSTALLERS_BY_UNIQUE = gql`
  query installerByUnique($installInput: InstallInput!) {
    installerByUnique(installInput: $installInput) {
      COAD_ID
      LOCATION
      FULL_NAME
    }
  }
`;

export default INSTALLERS_BY_UNIQUE;
