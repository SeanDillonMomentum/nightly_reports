import React, { useCallback, useContext } from "react";
import { ReformedContext } from "../Reformed";
import { Typography, Slider } from "@material-ui/core";

const ReformedSlider = ({ label, value, input }) => {
  const { data, setData } = useContext(ReformedContext);
  const handleChange = useCallback(
    (_, newVal) => setData({ ...data, [input]: newVal }),
    [data, setData, input]
  );

  return (
    <div className="textFieldWrap">
      <Typography gutterBottom>{label}</Typography>
      <Slider
        defaultValue={0}
        valueLabelDisplay="auto"
        id="continuous-slider"
        name={input}
        label={label}
        value={value}
        onChange={handleChange}
        // marks
        min={0}
        max={180}
        step={15}
      />
    </div>
  );
};

export default ReformedSlider;
