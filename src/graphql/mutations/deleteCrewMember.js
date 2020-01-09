import { gql } from "apollo-boost";

const DELETE_CREW_MEMBER = gql`
  mutation deleteCrewMember($id: ID!) {
    deleteCrewMember(id: $id)
  }
`;

export default DELETE_CREW_MEMBER;
