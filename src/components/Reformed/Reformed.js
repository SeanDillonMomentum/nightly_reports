import React from "react";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import styled from "styled-components";
import startcase from "lodash.startcase";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import ReformedArray from "./ReformedArray";

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

const Reformed = ({ data, setData, dataValidation, flex, style }) => {
  const handleChange = e =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleBool = key => {
    setData({ ...data, [key]: data[key] ? 0 : 1 });
  };
  const handleDate = (dateVal, name) => setData({ ...data, [name]: dateVal });

  return (
    <StyledFormDiv style={style || null} flex={flex}>
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
                id={`date-picker-pitched${key}`}
                label={sentence}
                value={val}
                onChange={e => handleDate(e, key)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          );
        }
        if (currValidation.type === "time") {
          return (
            <MuiPickersUtilsProvider key={key} utils={DateFnsUtils}>
              <KeyboardTimePicker
                className="textFieldWrap"
                disableToolbar
                variant="inline"
                margin="normal"
                name={key}
                id={`time-picker-pitched${key}`}
                label={sentence}
                value={val}
                onChange={e => handleDate(e, key)}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
              />
            </MuiPickersUtilsProvider>
          );
        }
        if (currValidation.type === "bool") {
          return (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={val ? true : false}
                  onChange={() => handleBool(key)}
                  name={key}
                  value={key}
                  color="primary"
                />
              }
              label={sentence}
            />
          );
        }
        if (currValidation.type === "array") {
          return (
            <ReformedArray
              key={key}
              label={sentence}
              data={data}
              config={currValidation}
              setData={setData}
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
