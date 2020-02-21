import styled from "styled-components";

export const EditCrewDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  .addIt {
    background-color: ${props => props.theme.midnightBlue};
    color: white;
    border-radius: 50%;
    margin-left: 5px;
    &:hover {
      opacity: 0.7;
    }
  }
`;
