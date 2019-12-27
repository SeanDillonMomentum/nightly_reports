import styled from "styled-components";
export const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  .tableDiv {
    margin: 30px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    font-family: ${props => props.theme.font};
    color: ${props => props.theme.midnightBlue};
  }
  .barGraph {
    margin: 30px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    font-family: ${props => props.theme.font};
    color: ${props => props.theme.midnightBlue};
  }
`;
