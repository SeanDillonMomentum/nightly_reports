import React from "react";
import styled from "styled-components";

const StyledHome = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Home = () => {
  return (
    <StyledHome>
      <h1>Welcome!</h1>
    </StyledHome>
  );
};

export default Home;
