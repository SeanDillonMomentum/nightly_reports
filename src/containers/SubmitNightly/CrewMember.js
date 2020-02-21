import React from "react";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  TableRow,
  TableCell
} from "@material-ui/core";

const CrewMember = ({ data, index, allData, allSetter, memberTypes }) => {
  const dataSetter = e => {
    let mutable = [...allData];
    mutable[index].memberType = e.target.value;
    allSetter(mutable);
  };
  console.log(data);
  console.log(allData);
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{data.FLDINST_USER.FULL_NAME}</TableCell>
      <TableCell>
        <FormControl style={{ width: "50%" }} className="textFieldWrap">
          <InputLabel>Crew Type</InputLabel>
          <Select
            name="memberType"
            value={data.memberType}
            onChange={e => dataSetter(e)}
          >
            {memberTypes.map(option => (
              <MenuItem
                style={{ display: "flex", flexDirection: "column" }}
                key={option.crew_memb_type_id}
                value={option.crew_memb_type_id}
              >
                {option.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};
export default CrewMember;
