import React, { useState, useContext } from "react";
import { ExpandMore, Cancel } from "@material-ui/icons";
import styled from "styled-components";
import { ReformedContext } from "../Reformed";

const StyledIcon = (icon, rotate) => styled(icon)`
  color: "green";
  transform: ${rotate ? `rotateX(180deg)` : null};
`;

const StyledList = styled.li`
  list-style: none;
  padding: 5px;
  font-size: 14px;
  &:hover {
    background: #4d18ff;
    color: #fff;
  }
`;
const StyledOptions = styled.div`
  .inputWrapper {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }
  .label {
    font-size: 14px;
  }
  .flexedSelect {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .select {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .select-wrapper {
    position: relative;
    z-index: 2;
    border: 1px solid lightgray;
    margin: 5px 0;
    border-radius: 8px;
    background: #fff;
    font-size: 14px;
    box-shadow: 0 4px 16px 0 rgba(#162a5a, 0.12);
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0 4px 24px -1px rgba(#162a5a, 0.16);
    }
  }
  .flexBubbles {
    flex: 1 0 35%;
    background: rgba(228, 236, 250, 1);
    margin: 5px;
    border-radius: 5px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    list-style: none;
  }
  .listContainer {
    border: 1px solid rgba(228, 236, 250, 0.7);

    border-radius: 5px;
    margin: 15px 0;
    overflow: auto;
    max-height: 100px;
  }
`;

const ReformedArray = ({ config, label }) => {
  const { data, setData } = useContext(ReformedContext);
  let { field, options, optionsKey } = config;
  const [openList, setOpenList] = useState(false);
  const StyledExpand = StyledIcon(ExpandMore, openList);
  const removeFromArray = x => {
    let mutable = { ...data };
    mutable[field] = mutable[field].filter(y => y !== x);
    setData(mutable);
  };
  const addToArray = x => {
    let mutable = { ...data };
    mutable[field].push(x);
    setData(mutable);
  };
  return (
    <StyledOptions>
      <div className="inputWrapper">
        <span className="label">{label}</span>
        <div className="select-wrapper">
          <div className="select">
            <div className="flexedSelect">
              {data[field].map(x => (
                <div className="flexBubbles" key={x}>
                  {options.find(y => y.id === x)[optionsKey]}
                  <Cancel
                    id="bubble"
                    onClick={() => removeFromArray(x)}
                    style={{ fontSize: "12px" }}
                  />
                </div>
              ))}
            </div>

            <StyledExpand onClick={() => setOpenList(!openList)} />
          </div>
        </div>
      </div>
      {openList && (
        <div className="listContainer">
          {options
            .filter(y => !data[field].includes(y.id))
            .map(option => (
              <StyledList key={option.id} onClick={() => addToArray(option.id)}>
                {option[optionsKey]}
              </StyledList>
            ))}
        </div>
      )}
    </StyledOptions>
  );
};

export default ReformedArray;
