import { gql } from "apollo-boost";

const CREATE_INSTALL_CREW = gql`
  mutation createInstallCrew($name: String!, $market_id: Int!) {
    createInstallCrew(name: $name, market_id: $market_id) {
      insCrewId
      name
    }
  }
`;

export default CREATE_INSTALL_CREW;
