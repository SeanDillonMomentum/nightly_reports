import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import SITE_ASSESS_BY_ID from "../../graphql/queries/siteAssessById";
import { TextField } from "@material-ui/core";
import { StyledSearchInputs } from "./styles";
import { StyledButton } from "../Home/styles";
import moment from "moment";

const SearchForSA = ({ data, setData, setCrmId }) => {
  const [noProj, setNoProj] = useState(false);
  const [siteAssessById, { loading, data: dataTwo }] = useLazyQuery(
    SITE_ASSESS_BY_ID
  );
  useEffect(() => {
    if (dataTwo && dataTwo.siteAssessById) {
      let {
        address1_composite,
        velosio_projectnumber,
        iis_opportunitynumber,
        name,

        iis_projectid
      } = dataTwo.siteAssessById;
      setCrmId(iis_projectid);
      setData(prevData => {
        return {
          ...prevData,
          customerName: name,
          projectNumber: velosio_projectnumber,
          opportunityNumber: iis_opportunitynumber,
          customerAddress: address1_composite
        };
      });
    } else if (dataTwo && !dataTwo.siteAssessById) {
      setNoProj(true);
      setTimeout(() => setNoProj(false), 3000);
      setCrmId("");
      setData(prevData => {
        return {
          ...prevData,
          customerName: "",
          date: moment().format("MM/DD/YY"),
          customerAddress: ""
        };
      });
    }
  }, [dataTwo, setData, setCrmId]);
  const queryProj = type => {
    if (type === "opp")
      siteAssessById({ variables: { oppNumber: data.opportunityNumber } });
    if (type === "proj")
      siteAssessById({ variables: { projectNumber: data.projectNumber } });
  };
  return (
    <StyledSearchInputs>
      <div className="inputSearch">
        <TextField
          value={data.opportunityNumber}
          name="opportunityNumber"
          label="Opportunity Number"
          placeholder="Opp Num"
          onChange={e => setData({ ...data, [e.target.name]: e.target.value })}
        />
        <StyledButton disabled={loading} onClick={() => queryProj("opp")}>
          {!loading ? "SEARCH BY OPP #" : "SEARCHING"}
        </StyledButton>
      </div>
      {noProj && <h3 style={{ color: "red" }}> No Corresponding Number</h3>}
      <div className="inputSearch">
        <TextField
          value={data.projectNumber}
          name="projectNumber"
          label="Project Number"
          placeholder="Project Number"
          onChange={e => setData({ ...data, [e.target.name]: e.target.value })}
        />
        <StyledButton disabled={loading} onClick={() => queryProj("proj")}>
          {!loading ? "SEARCH BY PROJ #" : "SEARCHING"}
        </StyledButton>
      </div>
    </StyledSearchInputs>
  );
};

export default SearchForSA;
