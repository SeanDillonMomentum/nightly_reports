import { gql } from "apollo-boost";

const ALL_CREW_MEMBERS = gql`
  query crewMembers {
    crewMembers {
      id
      name
      email
    }
  }
`;

export default ALL_CREW_MEMBERS;
