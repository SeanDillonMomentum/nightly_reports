import { gql } from "apollo-boost";

const REMOVE_CREW_MEMBER = gql`
  mutation removeCrewMember($crew_team_id: Int!) {
    removeCrewMember(crew_team_id: $crew_team_id) {
      crew_team_id
    }
  }
`;

export default REMOVE_CREW_MEMBER;
