import React, { useContext, useCallback } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { ReformedContext } from "../Reformed";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

const ReformedDate = ({ input, label, val }) => {
  const { data, setData } = useContext(ReformedContext);
  const handleDate = useCallback(
    name => dateVal => setData({ ...data, [name]: dateVal }),
    [data, setData]
  );
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className="textFieldWrap"
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        name={input}
        id={`date-picker-pitched${input}`}
        label={label}
        value={val}
        onChange={handleDate(input)}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default ReformedDate;
