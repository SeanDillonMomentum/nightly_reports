import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { membersInitial } from "./SubmitNightly";

const UserTeams = ({ setMembers, setTeam, currTeam, allTeams }) => {
  const handleChange = e => {
    setTeam(e.target.value);
    const teamMembers = allTeams.find(x => x.id === e.target.value);
    setMembers(membersInitial(teamMembers));
  };
  return (
    <FormControl className="searchTeam">
      <InputLabel>Team</InputLabel>
      <Select name="team" value={currTeam} onChange={handleChange}>
        {allTeams.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserTeams;
