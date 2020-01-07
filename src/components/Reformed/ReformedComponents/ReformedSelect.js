import React, { useContext, useCallback } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { ReformedContext } from "../Reformed";

const ReformedSelect = ({ label, input, val, config }) => {
  const { data, setData } = useContext(ReformedContext);
  const handleChange = useCallback(
    e => setData({ ...data, [e.target.name]: e.target.value }),
    [data, setData]
  );
  return (
    <FormControl className="textFieldWrap">
      <InputLabel>{label}</InputLabel>
      <Select name={input} value={val} onChange={handleChange}>
        {config.options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReformedSelect;
