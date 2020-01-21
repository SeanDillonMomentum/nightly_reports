import React, { useContext, useCallback } from "react";
import { ReformedContext } from "../Reformed";
import { TextField } from "@material-ui/core";

const ReformedText = ({ label, input, val, config }) => {
  const { data, setData } = useContext(ReformedContext);
  const handleChange = useCallback(
    e => setData({ ...data, [e.target.name]: e.target.value }),
    [data, setData]
  );
  return (
    <TextField
      inputProps={{
        maxLength: config.maxlength || null
      }}
      multiline={true}
      key={input}
      type="number"
      className="textFieldWrap"
      label={label}
      name={input}
      value={val}
      onChange={handleChange}
      placeholder={label}
    />
  );
};

export default ReformedText;
