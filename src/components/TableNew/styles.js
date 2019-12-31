import styled from "styled-components";

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
    justify-content: center;
  }
  .openButton {
    background-color: #001b59;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 5px;
  }
  .listModal {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .searchDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e5e5;
    /* margin-top: 20px; */
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
    background-color: ${props => props.theme.midnightBlue};
    color: white;
    border-radius: 5px;
    padding: 5px;
    margin-right: 15px;
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

const StyledNoData = styled.h1`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.midnightBlue};
  text-align: center;
`;
const Wrapper = styled.div`
  width: 95%;
  margin: 95px auto 30px auto;
  .root {
    margin: auto;
  }
  .tableWrapper {
    overflow: auto;
  }
  .editBtn {
    width: 50px;
    text-align: center;
  }
  .searchBar {
    margin: 15px 0;
    min-width: 350px;
  }
  .searchBarWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .primaryBtn {
    color: #0016;
  }
  .headerSort {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Button = styled.button`
  background-color: #ffffff;
  outline: none;
  padding: 9px 11px;
  display: flex;
  margin-left: 20px;
  border-radius: 5px;
  font-size: 24px;
  color: ${props => props.theme.midnightBlue};
  border: 1px solid ${props => props.theme.backgroundLightGrey};
  &:hover {
    background-color: ${props => props.theme.backgroundDarkGrey};
    transition: 0.4s all;
  }
`;

const CellHeader = styled.th`
  border: 1px solid ${props => props.theme.backgroundLightGrey};
  padding: 16px 12px;
  text-align: center;
  background-color: ${props => props.theme.backgroundDarkGrey};
  &:first-child {
    border-radius: 5px 0 0 0;
  }
  &:last-child {
    border-radius: 0 5px 0 0;
  }
  &:hover {
    opacity: ${props => (props.dropdown ? "1" : ".8")};
    cursor: pointer;
  }
  .cellDiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ${props => props.theme.font};
    font-size: 16px;
    color: ${props => props.theme.midnightBlue};
  }
  .cellDivContact {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-family: ${props => props.theme.font};
    font-size: 16px;
    color: ${props => props.theme.midnightBlue};
  }
  .cellDivIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${props => props.theme.font};
    font-size: 16px;
    color: ${props => props.theme.midnightBlue};
  }
  .arrow {
    /* margin-left: auto; */
    color: ${props => props.theme.slateGrey};
  }
  .arrowBoth {
    /* margin-left: auto; */
    color: ${props => props.theme.cadetBlue};
  }
`;

const NullCell = styled.td`
  border: 1px solid ${props => props.theme.backgroundLightGrey};
  padding: 16px 12px;
  background-color: ${props =>
    props.highlight === "lightblue"
      ? props.theme.lightBlue
      : props.highlight === "yellow"
      ? "yellow"
      : null};
  text-align: left;
  line-height: 1.42857143;
  font-family: ${props => props.theme.font};
  font-size: 14px;
  word-break: break-word;
`;

const ListViewContainer = styled.div`
  height: 100%;
  display: flex;
  font-family: ${props => props.theme.font};
  border: solid 1px ${props => props.theme.backgroundLightGrey};
  &:hover {
    background-color: ${props => props.theme.backgroundLightGrey};
  }
  .leftList {
    list-style-type: none;
    height: 100%;
    margin-right: 20px;
  }
  .rightList {
    list-style-type: none;
    height: 100%;
  }
  .leftItems {
    display: flex;
    align-items: center;
    margin: 2px 0;
    width: max-content;
  }
  .rightItems {
    display: flex;
    align-items: center;
    margin: 2px 0;
  }
`;

const Row = styled.tr`
  background-color: ${props => props.colorChange && props.theme.lightBlue};
`;

const FilterBar = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-between;
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.slateGrey};
  .searchIcon {
    margin: 0 5px 0 10px;
  }
  .input {
    width: ${props => props.placeholder}px;
    font-size: 18px;
    border: none;
    padding: 4px;
    &:focus {
      outline: none;
    }
  }
  .rightFilter {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rowsDisplayedDiv {
    display: inline-flex;
    align-items: center;
  }
  .exportDiv {
    display: flex;
  }
`;

const NullTable = styled.div`
  justify-content: center;
  color: ${props => props.theme.midnightBlue};
  padding: 15px 0 15px 30px;
  font-size: 24px;
  font-family: ${props => props.theme.font};
  display: flex;
  align-items: center;
`;

const TableContainer = styled.table`
  border-spacing: 0px;
  background: #ffffff;
  border-radius: 5px;
  width: 100%;
`;

const SideViewDiv = styled.div`
  font-size: 15px;
  border: 1px solid ${props => props.theme.backgroundLightGrey};
  max-height: 400px;
  overflow: auto;
  position: relative;
`;

const PageNumbers = styled.ul`
  padding-left: 0;
  border: 1px solid ${props => props.theme.backgroundLightGrey};
  font-family: ${props => props.theme.font};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  .pageButtons {
    position: relative;
    display: inline-block;
    text-align: center;
    border: none;
    font-size: 17px;
    background-color: #ffffff;
    border-radius: 3px;
    color: ${props => props.theme.midnightBlue};
    width: 35px;

    &::before {
      content: "";
      position: absolute;
      width: 50%;
      height: 2px;
      bottom: -5px;
      left: 25%;
      background-color: ${props => props.theme.midnightBlue};
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all 0.3s ease-in-out 0s;
      transition: all 0.3s ease-in-out 0s;
    }

    &:hover {
      &::before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }
  }
  .pageButtonsActive {
    position: relative;
    display: inline-block;
    text-align: center;
    border: none;
    font-size: 17px;
    background-color: #ffffff;
    border-radius: 3px;
    color: ${props => props.theme.midnightBlue};
    width: 35px;

    &::after {
      content: "";
      position: absolute;
      width: 50%;
      height: 2px;
      bottom: -5px;
      left: 25%;
      background-color: ${props => props.theme.midnightBlue};
      visibility: visible;
    }
  }
`;

const PageNumberDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  .pageNumbersLeftDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    border: 1px solid ${props => props.theme.backgroundLightGrey};
    border-bottom-left-radius: 110px;
    border-top-left-radius: 110px;
    border-right: none;
  }
  .chevronTable {
    color: ${props => props.theme.slateGrey};

    &:hover {
      color: ${props => props.theme.lightBlue};
    }
  }
  .chevronTableActive {
    color: ${props => props.theme.lightBlue};
  }
  .pageNumbersRightDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    border: 1px solid ${props => props.theme.backgroundLightGrey};
    border-bottom-right-radius: 110px;
    border-top-right-radius: 110px;
    border-left: none;
  }
  .pageNumbers {
    padding-left: 0;
    border: 1px solid ${props => props.theme.backgroundLightGrey};
    font-family: ${props => props.theme.font};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
  }
  .pageButtons {
    position: relative;
    display: inline-block;
    text-align: center;
    border: none;
    font-size: 17px;
    background-color: #ffffff;
    border-radius: 3px;
    color: ${props => props.theme.midnightBlue};
    width: 35px;

    &::before {
      content: "";
      position: absolute;
      width: 50%;
      height: 2px;
      bottom: -5px;
      left: 25%;
      background-color: ${props => props.theme.midnightBlue};
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all 0.3s ease-in-out 0s;
      transition: all 0.3s ease-in-out 0s;
    }

    &:hover {
      &::before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }
  }
  .pageButtonsActive {
    position: relative;
    display: inline-block;
    text-align: center;
    border: none;
    font-size: 17px;
    background-color: #ffffff;
    border-radius: 3px;
    color: ${props => props.theme.midnightBlue};
    width: 35px;

    &::after {
      content: "";
      position: absolute;
      width: 50%;
      height: 2px;
      bottom: -5px;
      left: 25%;
      background-color: ${props => props.theme.midnightBlue};
      visibility: visible;
    }
  }
`;

const Showing = styled.div`
  margin-top: 15px;
`;

export {
  NullCell,
  CellHeader,
  Button,
  ListViewContainer,
  Row,
  FilterBar,
  NullTable,
  TableContainer,
  SideViewDiv,
  Showing,
  PageNumbers,
  PageNumberDiv,
  Wrapper,
  StyledNoData,
  StyledList
};
