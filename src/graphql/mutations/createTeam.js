import { gql } from "apollo-boost";

const CREATE_TEAM = gql`
  mutation createTeam(
    $name: String!
    $user: ID!
    $crewMembers: [CrewMemberInput]!
  ) {
    createTeam(name: $name, user: $user, crewMembers: $crewMembers) {
      id
      name
    }
  }
`;
export default CREATE_TEAM;
