import styled from "styled-components";

export const StyledList = styled.div`
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
