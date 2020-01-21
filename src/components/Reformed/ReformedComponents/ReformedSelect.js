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
  const options = config.noOther
    ? config.options
    : [...config.options, "Other"];
  // console.log(config.tooltips && config.tooltips.map(x => console.log(x)));
  // if (config.tooltips)
  // console.log(config.tooltips.filter(x => val.includes(x.option)));
  // console.log(
  //   config.tooltips &&
  //     val.length &&
  //     config.tooltips.filter(x => val.findIndex(x.option) !== -1)
  // );
  return (
    <>
      {!alt ? (
        <FormControl className="textFieldWrap">
          <InputLabel>{label}</InputLabel>
          <Select
            multiple={config.multiple}
            name={input}
            value={val}
            onChange={handleChange}
          >
            {options.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {config.tooltips &&
          config.tooltips.filter(x => val.includes(x.option)).length
            ? config.tooltips
                .filter(x => val.includes(x.option))
                .map(y => (
                  <div
                    key={y.option}
                    style={{ color: "red", marginTop: "5px" }}
                  >
                    {y.tooltip}
                  </div>
                ))
            : null}
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
