import styled, { keyframes } from "styled-components";

const StyledSubmit = styled.div`
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
  h2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .searchTeam {
    width: 300px;
    margin: 15px 0;
  }
  .deleteHover {
    &:hover {
      opacity: 0.7;
    }
  }
`;

const StyledSearchInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
  .inputSearch {
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #e9e9e9;
  }
`;

const DropDown = styled.div`
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.backgroundLightGrey};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.backgroundLightGrey};
  background: ${props => (props.highlighted ? "#f7f7f7" : "white")};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${props => (props.highlighted ? props.theme.backgroundLightGrey : "white")};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }
  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export {
  DropDown,
  DropDownItem,
  SearchStyles,
  StyledSubmit,
  StyledSearchInputs
};
