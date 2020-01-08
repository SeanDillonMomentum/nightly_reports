import { gql } from "apollo-boost";

const UPDATE_RECENT = gql`
  mutation updateRecent($user: ID!, $team: ID!) {
    updateRecent(user: $user, team: $team) {
      id
    }
  }
`;

export default UPDATE_RECENT;
