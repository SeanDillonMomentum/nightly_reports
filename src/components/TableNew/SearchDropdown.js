import React, { useState, useRef, useEffect } from "react";
import searchImg from "../../assets/search.png";
import styled from "styled-components";
import { ArrowDropDown, Close } from "@material-ui/icons";

const StyledClose = styled(Close)`
  position: absolute;
  color: ${props => props.theme.lightSteelBlue};
  right: 70px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const StyledList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .innerSearchDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    justify-content: center;
  }
  .openButton {
    background-color: #001b59;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 5px;
  }
  .searchDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e5e5;
    min-width: 200px;
    font-size: 16px;
    border-radius: 5px;
    padding: 5px 0 5px 5px;
  }
  .searchIcon {
    margin: 0 5px 0 10px;
  }
  .ternaryContainer {
    position: absolute;
    top: 0;
    right: ${props => props.right};
    background-color: #001649;
    color: white;
    overflow: auto;
    border-radius: 5px;
    max-height: 150px;
    width: 250px;
    font-size: 14px;
  }
  .iconButton {
    background-color: ${props => props.theme.black};
    color: white;
    border-radius: 5px;
    padding: 5px;
  }
  ul {
    list-style: none;
  }
  li {
    &:hover {
      opacity: 0.7;
    }
  }
`;

const SearchDropdown = ({
  currSearch,
  setCurrSearch,
  search,
  setSearch,
  relatedData
}) => {
  const searchNode = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  });
  const checkSearchType = type => {
    if (type.key === currSearch) return { color: "green" };
    return null;
  };

  const handleClick = e => {
    if (
      searchNode &&
      searchNode.current &&
      searchNode.current.contains(e.target)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <StyledList right="-200px" className="search">
      <div className="innerSearchDiv">
        <input
          className="searchDiv"
          value={search}
          placeholder={relatedData.find(x => x.key === currSearch).label}
          onChange={e => setSearch(e.target.value)}
        />
        <StyledClose onClick={() => setSearch("")} />
        <img src={searchImg} alt="search" className="searchIcon" />
        <ArrowDropDown onClick={() => setOpen(true)} />
      </div>

      {open && (
        <div className="ternaryContainer" ref={searchNode}>
          <ul>
            {relatedData
              .filter(y => !y.sortless)
              .map(x => (
                <li
                  style={checkSearchType(x)}
                  key={x.id}
                  onClick={() => {
                    setCurrSearch(x.key);
                    setOpen(false);
                  }}
                >
                  {x.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </StyledList>
  );
};
export default SearchDropdown;
