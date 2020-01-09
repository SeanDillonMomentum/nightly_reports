import { gql } from "apollo-boost";

const SITE_ASSESS_BY_ID = gql`
  query siteAssessById($projectNumber: String, $oppNumber: String) {
    siteAssessById(projectNumber: $projectNumber, oppNumber: $oppNumber) {
      address1_composite
      velosio_projectnumber
      iis_opportunitynumber
      iis_sitevisitappt
      name
    }
  }
`;

export default SITE_ASSESS_BY_ID;
