import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import NIGHTLY_INSTALL_BY_ID from "../../graphql/queries/nightlyInstallById";
import { TextField } from "@material-ui/core";
import { StyledSearchInputs } from "./styles";
import { StyledButton } from "../Home/styles";

const SearchForProject = ({ data, setData }) => {
  const [nightlyInstallQuery, { loading, data: dataTwo }] = useLazyQuery(
    NIGHTLY_INSTALL_BY_ID
  );
  useEffect(() => {
    if (dataTwo && dataTwo.nightlyInstallById) {
      let {
        projectNumber,
        oppNumber,
        customerName,
        address,
        systemSize
        // panelType,
        // panelQuantity
      } = dataTwo.nightlyInstallById;
      setData(prevData => {
        return {
          ...prevData,
          projectNumber,
          oppNumber,
          customerName,
          customerAddress: address,
          dcSize: systemSize.toString()
          // panelType,
          // panelCount: panelQuantity
        };
      });
    }
  }, [dataTwo, setData]);
  const queryProj = type => {
    if (type === "opp")
      nightlyInstallQuery({ variables: { oppNumber: data.oppNumber } });
    if (type === "proj")
      nightlyInstallQuery({ variables: { projectNumber: data.projectNumber } });
  };
  return (
    <StyledSearchInputs>
      <div className="inputSearch">
        <TextField
          value={data.oppNumber}
          name="oppNumber"
          label="Opportunity Number"
          placeholder="Opp Num"
          onChange={e => setData({ ...data, [e.target.name]: e.target.value })}
        />
        <StyledButton disabled={loading} onClick={() => queryProj("opp")}>
          {!loading ? "SEARCH BY OPP #" : "SEARCHING"}
        </StyledButton>
      </div>
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

export default SearchForProject;
