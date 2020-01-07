import React, { useContext, useCallback } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { ReformedContext } from "../Reformed";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

const ReformedTime = ({ label, val, input }) => {
  const { data, setData } = useContext(ReformedContext);
  const handleDate = useCallback(
    name => dateVal => setData({ ...data, [name]: dateVal }),
    [data, setData]
  );
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        className="textFieldWrap"
        margin="normal"
        name={input}
        id={`time-picker-pitched${input}`}
        label={label}
        value={val}
        onChange={handleDate(input)}
        KeyboardButtonProps={{
          "aria-label": "change time"
        }}
      />
    </MuiPickersUtilsProvider>
  );
};
export default ReformedTime;
