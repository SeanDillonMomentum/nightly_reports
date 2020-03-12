import styled from "styled-components";

const StyledHeader = styled.div`
  .customButton {
    color: #001d49;
    background-color: #fff;
    padding: 15px;
  }
  .navbar {
    min-height: 64px;
    background-color: #ffffff;
    position: fixed;
    display: flex;
    flex-direction: row;
    box-shadow: none;
  }
  .toolbarLeft {
    width: 300px;
    background-color: ${props => props.theme.black};
    padding: 0;
    -webkit-box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
    -moz-box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
    box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
  }
  .menuButton {
    color: #ffffff;
    transition: transform 0.5s;
    transform: rotate(${props => props.show});
  }
  .imgHeader {
    /* animation: bounce 2s;
    -webkit-animation: bounce 2s; */
    margin-left: 27px;
    width: 60%;
  }
  .toolbar {
    padding: 0;
    max-height: 64px;
    width: calc(100% - 300px);
    background-color: #ffffff;
    -webkit-box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
    -moz-box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
    box-shadow: 0px 1px 5px 0px rgba(28, 52, 76, 1);
  }
  .grow {
    flex-grow: 1;
    color: ${props => props.theme.black};
    font-family: ${props => props.theme.font};
    font-size: 28px;
    margin-left: 30px;
  }

  p {
    color: black;
  }
`;
export { StyledHeader };
