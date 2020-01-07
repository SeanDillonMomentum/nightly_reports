import { gql } from "apollo-boost";

const ADD_CREW_MEMBER_TYPE = gql`
  mutation createCrewMemberType($type: String!) {
    createCrewMemberType(type: $type) {
      type
      id
    }
  }
`;

export default ADD_CREW_MEMBER_TYPE;
