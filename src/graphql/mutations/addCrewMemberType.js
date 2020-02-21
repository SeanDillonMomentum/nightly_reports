import { gql } from "apollo-boost";

const ADD_CREW_MEMBER_TYPE = gql`
  mutation createCrewMemberType($type: String!) {
    createCrewMemberType(type: $type) {
      crew_memb_type_id
      type
    }
  }
`;

export default ADD_CREW_MEMBER_TYPE;
