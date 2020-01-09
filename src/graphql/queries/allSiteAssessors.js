import { gql } from "apollo-boost";

const ALL_SITE_ASSESSORS = gql`
  query siteAssessRoster {
    allSiteAssessors {
      Territory
      State
      Assessor
    }
  }
`;

export default ALL_SITE_ASSESSORS;
