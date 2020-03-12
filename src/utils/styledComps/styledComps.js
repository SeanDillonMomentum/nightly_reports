import styled from "styled-components";
import { Table } from "@material-ui/core";

export const NoDataDiv = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 30px 0;
`;

export const StyledSubmit = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  margin: 30px;
  border-radius: 5px;
  background-color: white;
  z-index: 100;
  border-bottom: 2px solid lightgray;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  flex-direction: column;
`;

export const StyledButton = styled.button`
  margin: ${props => props.margin || "15px auto"};
  align-self: ${props => props.alignSelf};
  color: white;
  display: flex;
  width: ${props => props.width || "100px"};
  justify-content: space-evenly;
  align-items: center;
  background-color: ${props => props.theme.black};
  padding: 5px 10px;
  border: 2px solid white;
  border-radius: 5px;
  font-family: "Roboto", sans-serif;
  visibility: ${props => props.displayVal};
  transition: all 0.3s;
  &:hover {
    /* opacity: 0.7; */
    border: 2px solid ${props => props.theme.black};
    color: ${props => props.theme.black};
    background-color: white;
  }
`;

export const InfoGrid = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 30px 0;
  overflow: auto;
  display: ${props => props.display};
  color: ${props => props.theme.black};
  font-family: ${props => props.theme.font};
  position: relative;
  .filling-empty-space-childs {
    width: 45%;
    height: 0;
    margin: 12px 30px;
  }
  .itemGrid {
    flex-grow: 1;
  }
`;

export const StyledQuizButton = styled.button`
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  outline: none;
  &:focus {
    outline: none;
  }
  margin: 0;
  align-self: ${props => props.alignSelf};
  color: white;
  display: flex;
  width: 50px;
  justify-content: space-evenly;
  align-items: center;
  background-color: #001d49;
  padding: 5px 10px;
  border: none;
  font-family: "Roboto", sans-serif;
  visibility: ${props => props.displayVal};
`;

export const NoScoreStyle = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 30px 0;
`;

export const QuizCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  .card {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    text-align: left;
  }
  video {
    width: ${props => props.customStyles && "1150px"};
    /* max-width: ${props =>
      props.customStyles ? props.customStyles.imgMaxWidth : "100%"};
    max-height: ${props =>
      props.customStyles ? props.customStyles.imgMaxHeight : "100%"};
    width: ${props =>
      props.customStyles ? props.customStyles.imgWidth : "100%"};
    height: ${props =>
      props.customStyles ? props.customStyles.imgHeight : "100%"}; */
    /* display: flex;
    border-radius: 0; */
  }
  img {
    max-width: ${props =>
      props.customStyles ? props.customStyles.imgMaxWidth : "100%"};
    max-height: ${props =>
      props.customStyles ? props.customStyles.imgMaxHeight : "100%"};
    width: ${props =>
      props.customStyles ? props.customStyles.imgWidth : "100%"};
    height: ${props =>
      props.customStyles ? props.customStyles.imgHeight : "100%"};
    display: flex;
    border-radius: 0;
  }
  .quizBox{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .textFieldDiv {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px auto;
    color: ${props => props.theme.black};
    font-family: ${props => props.theme.font};
    border: 8px solid #ffffff;
    /* width: 200px; */
    padding: 5px;
    text-align: center;
    font-size: 24px;
    border-radius: 8px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0 0 6px rgba(0, 0, 0, 0.23);
    -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0 0 6px rgba(0, 0, 0, 0.23);
  }
`;

export const HeaderDiv = styled.div`
  border: ${props => (props.noBorder ? "none" : "1px solid #e5e5e5")};
  padding: 0 20px;
  border-radius: ${props => (props.noBorder ? "0" : "5px 5px 0 0")};
  font-size: 12px;
  max-width: 1250px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  background-color: ${props => props.theme.black};
  h3 {
    font-weight: 500;
  }
`;

export const StyledUpper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 15px;
  align-items: center;
  svg {
    color: white;
  }
  h1 {
    flex: 1;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: none !important;
    }
    &::after {
      border-bottom: none !important;
    }
  }
  .buttonContainer {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logoutButton {
    background-color: #933e3e;
    color: white;
    border-radius: 50%;
    padding: 15px;
    width: 45px;
    height: 45px;
  }
  #allMenuItems {
    margin: 10px 30px;
    color: white;
  }
  .autoComplete {
    flex: 2;
    border: none;
    margin: 15px;
  }
  .autoCompleteInput {
    border-radius: 30px;
    background-color: #373737;
    &::placeholder {
      color: white;
    }
  }
  /* .MuiOutlinedInput-adornedEnd {
    border-radius: 30px;
    background-color: #373737;
  } */
`;

export const FormCard = styled.div`
background-color: white;
  width: 90%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.black};
  font-family: ${props => props.theme.font};
  /* border: 8px solid #ffffff; */
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 0 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
  h1 {
    padding: 10px;
    margin: 0px;
    display: flex;
    box-shadow: 0 2px 1px -1px gray;
    align-items: center;
    font-size: 18px;
    /* border-bottom: 1px solid ${props => props.theme.slateGrey}; */
  }
  .headerIcon {
    margin-right: 5px;
  }
  span {
  }
  form {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .errorField {
    margin-top: 5px auto;
    text-align: center;
    color: ${props => props.theme.alertRed};
    font-size: 14px;
  }
  .successField {
    margin-top: 5px;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
  }
  .formInput {
    padding: 5px 0;
  }
  .buttonTwin {
    justify-content: center;
    display: flex;
    align-self: center;
  }

  .uploadImage {
    margin: 0 auto;
    justify-content: center;
    width: 50%;
  }

`;

export const StyledMemberCard = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;

  .hiddenDiv {
    background-color: white;
    position: fixed;
    z-index: 100;
    width: calc(100% - 500px);
  }
  .tableDiv {
    max-height: 750px;
    overflow-y: auto;
  }
  .member {
    font-size: 16px;
    margin: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .searchDiv {
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e5e5;
    margin-top: 20px;
    border-radius: 5px;
    padding: 5px 20px 5px 10px;
    width: 200px;
  }
  .searchIcon {
    margin: 0 5px 0 10px;
  }
  .input {
    /* width: 100px; */
    font-size: 18px;
    border: none;
    padding: 4px;
    &:focus {
      outline: none;
    }
  }
`;
export const StyledTable = styled(Table)`
  border: 3px solid ${props => props.theme.black};
  font-family: ${props => props.theme.font};
  margin: 15px 0;
  .cell {
    text-align: center;
    border: 2px solid ${props => props.theme.backgroundLightGrey};
  }
  .nonHighlighted {
    &:nth-child(even) {
      background-color: ${props => props.theme.backgroundDarkGrey};
    }
  }
  .highlighted {
    background-color: ${props => props.theme.black};
  }
  .highlightedCell {
    color: white;
    text-align: center;
  }
  .checkBox {
    &:hover {
      opacity: 0.8;
    }
  }
`;
