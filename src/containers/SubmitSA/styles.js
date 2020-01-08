import styled from "styled-components";

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

export const StyledSearchInputs = styled.div`
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
