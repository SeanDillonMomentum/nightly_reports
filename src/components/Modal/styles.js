import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
  font-family: ${props => props.theme.font};
  .modalMain {
    position: fixed;
    border-radius: 8px;
    background-color: #ffffff;
    width: ${props => (props.width ? props.width : "100%")};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    transition: left 0.5s;
    left: ${props => (props.sideNavOpen ? "calc(50% + 50px)" : "50%")};
  }
`;

export default Modal;
