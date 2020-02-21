import { gql } from "apollo-boost";

const NIGHTLY_INSTALL_BY_ID = gql`
  query nightlyInstallById($projectNumber: String, $oppNumber: String) {
    nightlyInstallById(projectNumber: $projectNumber, oppNumber: $oppNumber) {
      projectNumber
      oppNumber
      customerName
      address
      systemSize
      panelType
      panelQuantity
      Office
    }
  }
`;

export default NIGHTLY_INSTALL_BY_ID;
