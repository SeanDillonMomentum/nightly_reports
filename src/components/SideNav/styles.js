import styled from "styled-components";

const StyledSidebar = styled.div`
  position: fixed;
  top: 64px;
  bottom: ${props => (!props.open ? null : "0")};
  transform: translateX(${props => (!props.open ? "-135px" : "0")});
  width: 135px;
  transition: all 0.5s;
  border-right: 1px solid ${props => props.theme.backgroundLightGrey};
  bottom: 0;
  font-family: ${props => props.theme.font};
  background-color: ${props => props.theme.midnightBlue};
  z-index: 1;
  overflow-y: auto;
  flex-direction: column;
  display: flex;
  /* overflow-y: hidden; */
  button {
    text-align: center;
    background-image: linear-gradient(
      ${props => props.theme.lightBlue},
      ${props => props.theme.cadetBlue}
    );
    width: 50%;
    padding: 20px 0;
    margin: 20px auto;
    border-radius: 20px;
    font-size: 18px;
    color: white;
    &:hover {
      opacity: 0.7;
    }
  }
  .sidenavItems {
    top: 6px;
    text-align: center;
    background-image: linear-gradient(
      ${props => props.theme.lightBlue},
      ${props => props.theme.cadetBlue}
    );
    width: 90%;
    margin: 20px auto;
    border-radius: 20px;
  }
  .iconText {
    list-style-type: none;
    font-size: 18px;
    color: ${props => props.theme.backgroundLightGrey};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
  }
  .adminTextTop {
    padding: 3px 0;
    font-size: 24px;
  }
  .adminTextBottom {
    padding: 3px 0;
    font-size: 24px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin-top: 0;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  img,
  svg {
    color: ${props => props.theme.backgroundLightGrey};
  }
  &::-webkit-scrollbar {
    overflow: hidden;
    width: 0px;
  }
  .chevron {
    padding: 0;
    position: absolute;
    right: 15px;
  }
`;

export default StyledSidebar;
