import { gql } from "apollo-boost";

const ADD_CREW_MEMBER = gql`
  mutation createCrewMember($name: String!) {
    createCrewMember(name: $name) {
      name
      id
    }
  }
`;

export default ADD_CREW_MEMBER;
