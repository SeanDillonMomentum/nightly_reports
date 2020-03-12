import styled from "styled-components";

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
    border: 2px solid ${props => props.theme.black};
    color: ${props => props.theme.black};
    background-color: white;
  }
`;

export const Card = styled.div`
  margin: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.black};
  flex: 1 0 30%;
  text-align: center;
  &:hover {
    opacity: 0.7;
  }
  .searchDiv {
    display: flex;
    flex-direction: column;
  }
  .searchers {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
  }
  .addInventory {
    display: flex;
    flex-direction: column;
  }
  .innerCard {
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .editDiv {
    margin: 0 5px;
  }
  h1 {
    padding: 15px;
  }
  x .flexedCell {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
`;
