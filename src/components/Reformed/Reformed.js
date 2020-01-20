import React from "react";
import styled from "styled-components";
import startcase from "lodash.startcase";
import "date-fns";
import ReformedArray from "./ReformedComponents/ReformedArray";
import ReformedSelect from "./ReformedComponents/ReformedSelect";
import ReformedDate from "./ReformedComponents/ReformedDate";
import ReformedTime from "./ReformedComponents/ReformedTime";
import ReformedSwitch from "./ReformedComponents/ReformedSwitch";
import ReformedText from "./ReformedComponents/ReformedText";
import ReformedSlider from "./ReformedComponents/ReformedSlider";

export const ReformedContext = React.createContext();

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
  const inputType = type => {
    let comp;
    switch (type) {
      case "date": {
        comp = ReformedDate;
        break;
      }
      case "time": {
        comp = ReformedTime;
        break;
      }
      case "bool": {
        comp = ReformedSwitch;
        break;
      }
      case "select": {
        comp = ReformedSelect;
        break;
      }
      case "slider": {
        comp = ReformedSlider;
        break;
      }
      case "array": {
        comp = ReformedArray;
        break;
      }
      default: {
        comp = ReformedText;
        break;
      }
    }
    return comp;
  };
  return (
    <ReformedContext.Provider
      value={{ data, setData, dataValidation, flex, style }}
    >
      <StyledFormDiv style={style || null} flex={flex}>
        {Object.entries(data).map(([key, val]) => {
          let currValidation = dataValidation.find(x => x.field === key);
          if (!currValidation) return null;
          let sentence = currValidation.label || startcase(key);
          let InputComponent = inputType(currValidation.type);
          // console.log(currValidation.hiddenTrigger);
          if (
            currValidation.hiddenTrigger &&
            !data[currValidation.hiddenTrigger]
          ) {
            return null;
          }
          return (
            <InputComponent
              key={key}
              input={key}
              label={sentence}
              val={val}
              config={currValidation}
            />
          );
        })}
      </StyledFormDiv>
    </ReformedContext.Provider>
  );
};

export default Reformed;
