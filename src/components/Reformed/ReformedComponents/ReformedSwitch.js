import React, { useCallback, useContext } from "react";
import { ReformedContext } from "../Reformed";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const ReformedSwitch = ({ val, input, label }) => {
  const { data, setData } = useContext(ReformedContext);
  const handleBool = useCallback(
    inputVal => () => {
      setData({ ...data, [inputVal]: data[inputVal] ? 0 : 1 });
    },
    [data, setData]
  );

  return (
    <FormControlLabel
      key={input}
      className="textFieldWrap"
      control={
        <Checkbox
          checked={val === 1 ? true : false}
          onChange={handleBool(input)}
          name={input}
          value={input}
          color="primary"
        />
      }
      label={label}
    />
  );
};

export default ReformedSwitch;
