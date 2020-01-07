import { gql } from "apollo-boost";

const ALL_CREW_MEMBER_TYPES = gql`
  query crewMemberTypes {
    crewMemberTypes {
      id
      type
    }
  }
`;

export default ALL_CREW_MEMBER_TYPES;
