import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const ReformedSelect = ({ label, data, setData, keyVal, val, config }) => (
  <FormControl className="textFieldWrap">
    <InputLabel>{label}</InputLabel>
    <Select
      name={keyVal}
      value={val}
      onChange={e => setData({ ...data, [e.target.name]: e.target.value })}
    >
      {config.options.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default ReformedSelect;
