import { gql } from "apollo-boost";

const ADD_CREW_MEMBER = gql`
  mutation createCrewMember($name: String!, $email: String!) {
    createCrewMember(name: $name, email: $email) {
      name
      id
      email
    }
  }
`;

export default ADD_CREW_MEMBER;
