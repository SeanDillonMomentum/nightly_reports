import { gql } from "apollo-boost";

const ALL_CREW_MEMBER_TYPES = gql`
  query crewMemberTypes {
    crewMemberTypes {
      crew_memb_type_id
      type
    }
  }
`;

export default ALL_CREW_MEMBER_TYPES;
