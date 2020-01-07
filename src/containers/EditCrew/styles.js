import styled from "styled-components";

const StyledEdit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  .lowerFlex {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }
  .tableHeaders {
    background-color: #f5f5f5;
  }
  h2 {
    margin: 0px;
    padding: 10px;
    border-bottom: 1px solid #e9e9e9;
    color: ${props => props.theme.midnightBlue};
  }
  .split {
    flex: 5;
    margin: 30px;
  }
  .tableContainer {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    /* margin:30px; */
    /* width: 100%; */
  }
  .form {
    display: flex;
    flex-direction: column;
    margin: 15px;
    justify-content: center;
    align-items: center;
  }
  .inputLength {
    width: 90%;
  }
  .success {
    margin: 10px 0;
    color: green;
  }
  .error {
    margin: 10px 0;
    color: red;
  }
`;

export { StyledEdit };
