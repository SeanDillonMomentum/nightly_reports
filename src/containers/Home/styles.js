import styled from 'styled-components';

export const StyledButton = styled.button`
  margin: ${props => props.margin || '15px 0'};
  align-self: ${props => props.alignSelf};
  color: white;
  display: flex;
  width: ${props => props.width || '100px'};
  justify-content: space-evenly;
  align-items: center;
  background-color: #001d49;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  visibility: ${props => props.displayVal};
  &:hover {
    opacity: 0.7;
  }
`;

export const Card = styled.div`
  width: 80%;
  margin: 30px auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.midnightBlue};
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
  input {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e5e5;
    margin: 5px 0;
    border-radius: 5px;
    padding: 5px;
  }
  .editDiv {
    margin: 0 5px;
  }
  h1 {
    background-color: #f9f9f9;
    font-size: 28px;
    display: flex;
    align-items: center;
    padding: 5px 15px;
    margin: 0;
    border-radius: 15px 15px 0 0;
  }
  x .flexedCell {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
`;
