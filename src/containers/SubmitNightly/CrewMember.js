import React from "react";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  TableRow,
  TableCell
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

const CrewMember = ({ data, index, allData, allSetter, memberTypes }) => {
  const dataSetter = e => {
    let mutable = [...allData];
    mutable[index].memberType = e.target.value;
    allSetter(mutable);
  };
  const remove = () => allSetter(allData.filter((_, ind) => index !== ind));
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>
        <FormControl style={{ width: "50%" }} className="textFieldWrap">
          <InputLabel>Crew Type</InputLabel>
          <Select
            name="memberType"
            value={data.memberType}
            onChange={e => dataSetter(e)}
          >
            {memberTypes.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <DeleteForever className="deleteHover" onClick={remove} />
      </TableCell>
    </TableRow>
  );
};
export default CrewMember;
