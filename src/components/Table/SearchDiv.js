import React, { useState, useRef, useEffect } from "react";
import { relatedData } from "../../utils/dataHelpers";
import { StyledList } from "./styles";
import searchImg from "../../assets/search.png";

const SearchDiv = ({ searchType, setSearchType, inputVal, setInputVal }) => {
  const searchNode = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  });

  const [open, setOpen] = useState(false);
  const checkSearchType = type => {
    if (type.name === searchType) return { color: "green" };
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
    <StyledList right="-40px" className="search">
      <div className="innerSearchDiv">
        <input
          className="searchDiv"
          value={inputVal}
          placeholder={
            !searchType
              ? ""
              : relatedData.find(x => x.name === searchType).header
          }
          onChange={e => setInputVal(e.target.value)}
        />
        <img src={searchImg} alt="search" className="searchIcon" />
        <button className="openButton" onClick={() => setOpen(true)}>
          SWITCH SEARCH
        </button>
      </div>

      {open && (
        <div className="ternaryContainer" ref={searchNode}>
          <ul>
            {relatedData.map((x, index) => (
              <li
                style={checkSearchType(x)}
                key={index}
                onClick={() => {
                  setSearchType(x.name);
                  setOpen(false);
                }}
              >
                {x.header}
              </li>
            ))}
          </ul>
        </div>
      )}
    </StyledList>
  );
};
export default SearchDiv;
