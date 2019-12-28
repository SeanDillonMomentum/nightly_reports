import React from "react";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import styled from "styled-components";
import startcase from "lodash.startcase";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import moment from "moment";

const StyledFormDiv = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .textFieldWrap {
    margin: 1%;
    flex: 1 0 ${props => props.flex};
  }
`;

const Reformed = ({ data, setData, dataValidation, flex }) => {
  const handleChange = e =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleBool = name => event => {
    setData({ ...data, [name]: event.target.checked });
  };
  return (
    <StyledFormDiv flex={flex}>
      {Object.entries(data).map(([key, val]) => {
        let sentence = startcase(key);
        let currValidation = dataValidation.find(x => x.field === key);
        if (!currValidation) return null;
        if (currValidation.type === "date") {
          return (
            <MuiPickersUtilsProvider key={key} utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="textFieldWrap"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                name={key}
                id="date-picker-pitched"
                label={sentence}
                value={moment().format("MM/DD/YYYY")}
                onChange={e => handleChange(e, key)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          );
        }
        if (currValidation.type === "bool") {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={val}
                  onChange={handleBool(val)}
                  value={key}
                  color="primary"
                />
              }
              label={sentence}
            />
          );
        }
        return (
          <TextField
            key={key}
            className="textFieldWrap"
            label={sentence}
            name={key}
            value={val}
            onChange={e => handleChange(e)}
            placeholder={sentence}
          />
        );
      })}
    </StyledFormDiv>
  );
};

export default Reformed;
