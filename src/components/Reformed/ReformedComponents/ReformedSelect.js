import React, { useContext, useCallback, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@material-ui/core";
import { ReformedContext } from "../Reformed";
import { Cancel } from "@material-ui/icons";

const ReformedSelect = ({ label, input, val, config }) => {
  const { data, setData } = useContext(ReformedContext);
  const [alt, setAlt] = useState(false);
  const handleChange = useCallback(
    e => setData({ ...data, [e.target.name]: e.target.value }),
    [data, setData]
  );
  const handleReset = () => {
    setData({ ...data, [input]: "" });
    setAlt(false);
  };
  useEffect(() => {
    if (val === "Other" && !alt) setAlt(true);
  }, [val, alt]);
  return (
    <>
      {!alt ? (
        <FormControl className="textFieldWrap">
          <InputLabel>{label}</InputLabel>
          <Select name={input} value={val} onChange={handleChange}>
            {[...config.options, "Other"].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <div className="textFieldWrap">
          <TextField
            style={{ width: "90%" }}
            multiline={true}
            key={input}
            // className="textFieldWrap"
            label={label}
            name={input}
            value={val}
            onChange={handleChange}
            placeholder={label}
          />
          <Cancel onClick={() => handleReset()} />
        </div>
      )}
    </>
  );
};

export default ReformedSelect;
