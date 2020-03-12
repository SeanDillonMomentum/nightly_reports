import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import SuccessModal from "../../components/Modal/SuccessModal";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import ALL_INSTALLERS from "../../graphql/queries/allInstallers";
import DragComponent from "./DragComponent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import EditModal from "./EditModal";
import { StyledUpper } from "../../utils/styledComps/styledComps";
import { makeStyles } from "@material-ui/core/styles";
export const CrewContext = React.createContext({});

const EditTeams = ({ permissions }) => {
  const { loading, error, data } = useQuery(ALL_INSTALLERS, {
    variables: { market_id: +permissions.all_market.market_id }
  });
  const [editing, setEditing] = useState("");
  const [success, setSuccess] = useState("");
  const [currentSelected, setCurrentSelected] = useState({ FULL_NAME: "" });
  const filteredInstallers = () => {
    let initialFilter = data.allInstallers.filter(
      y => y.LOCATION === permissions.all_market.name
    );
    let allCoads = data.allInstallCrewsByMarket.reduce((total, curr) => {
      curr.crew_team_members.map(v => total.push(v.coad_id));
      return total;
    }, []);

    return initialFilter.filter(filt => !allCoads.includes(filt.COAD_ID));
  };

  if (loading) return <OtherLoader />;
  if (error) return <div>An Error Occurred</div>;
  return (
    <CrewContext.Provider value={data}>
      <StyledUpper>
        <h1>IM Reports</h1>
        <Autocomplete
          className="autoComplete"
          id="allMenuItems"
          value={currentSelected}
          options={filteredInstallers()}
          getOptionLabel={option => option.FULL_NAME}
          onChange={(_, newValue) =>
            setCurrentSelected(newValue || { FULL_NAME: "" })
          }
          filterSelectedOptions
          renderInput={params => (
            <TextField
              {...params}
              className="autoCompleteInput"
              placeholder="Search"
              fullWidth
              // InputProps={{ classes }}
            />
          )}
        />
        <div className="buttonContainer">
          <button className="logoutButton">S</button>
        </div>
      </StyledUpper>
      {editing && (
        <EditModal
          setSuccessModalOpen={setSuccess}
          modalOpen={editing}
          setModalOpen={setEditing}
          permissions={permissions}
        />
      )}
      <DragComponent
        setEditing={setEditing}
        currentSelected={currentSelected}
        setCurrentSelected={setCurrentSelected}
        permissions={permissions}
      />
      <SuccessModal
        specialText={success}
        modalOpen={success}
        setModalOpen={setSuccess}
      />
    </CrewContext.Provider>
  );
};

export default EditTeams;
