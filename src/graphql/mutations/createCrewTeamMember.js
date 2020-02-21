import { gql } from "apollo-boost";

const CREATE_CREW_TEAM_MEMBER = gql`
  mutation createCrewTeamMember($coad_id: String!, $crew_id: Int!) {
    createCrewTeamMember(coad_id: $coad_id, crew_id: $crew_id) {
      coad_id
      crew_id
    }
  }
`;

export default CREATE_CREW_TEAM_MEMBER;
