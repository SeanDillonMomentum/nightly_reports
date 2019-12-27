import React from 'react';
import styled from 'styled-components';
import logo from '../assets/momentum_logo.png';

const StyledLogin = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    135deg,
    ${props => props.theme.momentumBlue},
    ${props => props.theme.midnightBlue}
  );
  /* background-color: ${props => props.theme.momentumBlue}; */
  font-family: ${props => props.theme.font};
  align-items: center;
  .loginCard {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 35px;
    border-radius: 8px;
    background-color: #ffffff;
    margin-bottom: 20px;
    align-items: center;
  }
  h3 {
    text-align: center;
  }
  h6 {
    margin: 15px 40px 55px 40px;
    text-align: center;
  }

  h5 {
    text-align: center;
  }
  .noMatch {
    font-family: ${props => props.theme.font};
    margin: 25px 0;
    font-size: 20px;
    text-align: center;
  }

  .form-width {
    width: 12.6;
  }

  button {
    margin: 17px 0 5px 0;
    font-size: 18px;
    border: none;
    background-color: ${props => props.theme.momentumBlue};
    padding: 9px 16px;
    letter-spacing: 0.2px;
    color: #ffffff;
    border-radius: 30px;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Login = ({ login }) => {
  return (
    <StyledLogin>
      <div className="loginCard">
        <img src={logo} alt="Momentum Solar" />
        <h1>Momentum Solar</h1>
        <button onClick={() => login()}>LOGIN</button>
      </div>
    </StyledLogin>
  );
};

export default Login;
